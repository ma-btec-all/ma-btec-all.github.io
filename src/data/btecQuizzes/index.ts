import type { QuizQuestion } from "@/data/cultureQuizzes";

import beauty from "./Beauty_Specialty_Quiz.json";
import creative from "./Creative_Media_Quiz.json";
import engineering from "./Engineering.json";
import tourism from "./Tourism_and_Travel_Quiz.json";
import art from "./art_and_design.json";
import agriculture from "./btec_agriculture_data.json";
import it from "./btec_it_data.json";
import construction from "./building_and_construction.json";
import business from "./business_exam_200.json";
import healthcare from "./healthcare_quiz.json";
import hospitality from "./hospitality_test.json";

interface RawQ {
  question: string;
  options: string[] | Record<string, string>;
  answer?: string; // letter (أ/ب/ج/د) OR full text
  correctAnswer?: string | number; // full text OR index
}

function stripLetterPrefix(s: string): string {
  return s.replace(/^\s*[أ-ي]\s*[\)\.\-]\s*/, "").trim();
}

function normalize(raw: any): QuizQuestion[] {
  const arr: RawQ[] = Array.isArray(raw) ? raw : raw.questions;
  const out: QuizQuestion[] = [];
  for (const q of arr) {
    if (!q || !q.question || !q.options) continue;

    let optsArr: string[] = [];
    let answerStr: string | null = null;

    if (Array.isArray(q.options)) {
      optsArr = q.options.map((o) => String(o));

      if (typeof q.correctAnswer === "number") {
        answerStr = optsArr[q.correctAnswer] ?? null;
      } else if (typeof q.correctAnswer === "string") {
        const ca = q.correctAnswer.trim();
        answerStr = optsArr.find((o) => o === ca || stripLetterPrefix(o) === ca) ?? ca;
      } else if (typeof q.answer === "string") {
        const a = q.answer.trim();
        // Letter answer like "أ"/"ب"
        const letterIdx = ["أ", "ب", "ج", "د", "هـ", "ه", "و"].indexOf(a);
        if (letterIdx >= 0 && letterIdx < optsArr.length) {
          answerStr = optsArr[letterIdx];
        } else {
          answerStr =
            optsArr.find((o) => o === a || stripLetterPrefix(o) === a) ?? a;
        }
      }
    } else if (typeof q.options === "object") {
      // { "أ": "...", "ب": "..." }
      const keys = Object.keys(q.options);
      optsArr = keys.map((k) => q.options[k]);
      if (typeof q.answer === "string") {
        const a = q.answer.trim();
        if (q.options[a] !== undefined) {
          answerStr = q.options[a];
        } else {
          answerStr = optsArr.find((o) => o === a) ?? a;
        }
      } else if (typeof q.correctAnswer === "string") {
        answerStr = optsArr.find((o) => o === q.correctAnswer) ?? q.correctAnswer;
      }
    }

    if (!answerStr || optsArr.length < 2) continue;
    out.push({ question: String(q.question), options: optsArr, answer: answerStr });
  }
  return out;
}

const datasets: Record<string, unknown> = {
  it,
  agriculture,
  hospitality,
  business,
  art,
  construction,
  engineering,
  "creative-media": creative,
  tourism,
  beauty,
  healthcare,
  // sports placeholder reuses healthcare? No — leave empty if missing
};

const cache: Record<string, QuizQuestion[]> = {};

export function getBtecQuestions(deptId: string): QuizQuestion[] {
  if (cache[deptId]) return cache[deptId];
  const raw = datasets[deptId];
  if (!raw) return (cache[deptId] = []);
  return (cache[deptId] = normalize(raw));
}

export function getBtecQuestionCount(deptId: string): number {
  return getBtecQuestions(deptId).length;
}
