import type { DepartmentResources, GradeData, SemesterData, ResourceFile } from "./assistanceResources";

// روابط متكررة لجميع الفصول في الرعاية الصحية للصف العاشر
const SPECS_URL = "https://drive.google.com/file/d/1PoT1BW5yOoV4wOSWdLIWTFs_WcHbpMzS/view?usp=drive_link";

const BOOKS: Record<string, string> = {
  u1: "https://drive.google.com/file/d/15bScZoPF05q3SkKcNSJVgrjxRONSW88g/view?usp=drive_link",
  u2: "https://drive.google.com/file/d/1v-WZ4hx6WRbCqiisjbnWoZ0Oy09U9Ttc/view?usp=drive_link",
  u3: "https://drive.google.com/file/d/1s6wly9V-ta5KzGQ3YjqcgUxhJ9NU8BCD/view?usp=drive_link",
  u4: "https://drive.google.com/file/d/1sznV0MCtpPsrBuHDXR8a2Yf6g6clHVfO/view?usp=drive_link",
  u5: "https://drive.google.com/file/d/1RppOAONNpvtVoihNSlszTwxaXe1PChIf/view?usp=drive_link",
  u7: "https://drive.google.com/file/d/15bkEnZ9jZ7VwGF1Dlv1a3rLvDLvfphdD/view?usp=drive_link",
  u8: "https://drive.google.com/file/d/1FK_ogb7X6rCcsUZNuzOmeMrwTXSbgRcc/view?usp=drive_link",
};

const EXPLANATIONS: Record<string, string> = {
  u1: "https://docs.google.com/presentation/d/1Od9uUJ0zhaVYO5vt_mggQFFD0S9fM0kx/edit",
  u2: "https://docs.google.com/presentation/d/1JWMQakeAKzg9UsxC5K5Hx0-Wg-RgU1cr/edit",
  u3: "https://docs.google.com/presentation/d/10xJqv2KFqFZnCzs3kDmXblkk-NakHXvg/edit",
  u4: "https://docs.google.com/presentation/d/1ybv6iByl6rugF1mcpYhqfnjhG1UIOlNK/edit",
  u5: "https://docs.google.com/presentation/d/1kWHBgZFIoMRs7QeCD34503EaZSvHOlFB/edit",
  u7: "https://docs.google.com/presentation/d/16T7aaPcUip9vXqgDfINVHsclDRix7ocq/edit",
  u8: "https://docs.google.com/presentation/d/1Azd7cd1EYNi2-wf1hz9G_5lgyI0GChnz/edit",
};

const ASSIGNMENTS: Record<string, string> = {
  u1: "https://docs.google.com/document/d/1Xadz-O6QhG78zE8gtz-p77Egef3l3bir/edit",
  u2: "https://docs.google.com/document/d/1G0GyHQK0wvztlsgvVkQdqnYtdv8pnsFr/edit",
  u3: "https://docs.google.com/document/d/1UJ1aBi46e25hAoiUSBqbkXSjMwWk2bsC/edit",
  u4: "https://docs.google.com/document/d/17B-Smgkdyyi0FfFNOVTrelkUFkiypUZ8/edit",
  u5: "https://docs.google.com/document/d/17B-Smgkdyyi0FfFNOVTrelkUFkiypUZ8/edit",
  u7: "https://docs.google.com/document/d/10wZqbio4TKe7sopUR0IGctcxuRkF_rLP/edit",
  u8: "https://docs.google.com/document/d/1hZXT8cFtYQtui4AD35JWLmOel6EWv1an/edit",
};

const TEACHER: Record<string, string> = {
  u1: "https://docs.google.com/document/d/1F29_nfQZT1kNmEiZIRzK0m-5FCg5kiWl/edit",
  u2: "https://docs.google.com/document/d/1ReLfReH0YG5mET058-7zNOoZimGywe-B/edit",
  u3: "https://docs.google.com/document/d/1Z9SMePHYvg1Fhpfm5JKFyAgrZ44PeC4F/edit",
  u4: "https://docs.google.com/document/d/1xCZUx_3VI8gLoKeodUccKauhG2a3Aszg/edit",
  u5: "https://docs.google.com/document/d/1mEYDsV7FqaOKMX3PZ8buoiXzHamoGmK7/edit",
  u7: "https://docs.google.com/document/d/11lE-iQuH1Xbu0Jpc2zXz3HgT9DITizKe/edit",
  u8: "https://docs.google.com/document/d/1042aQzOzS6_nPiX_pKym2bo320VcGd2D/edit",
};

const UNITS: Array<{ key: keyof typeof BOOKS; title: string }> = [
  { key: "u1", title: "الوحدة 1: تطوّر الإنسان خلال مراحل الحياة" },
  { key: "u2", title: "الوحدة 2: التمتع بحياة صحية" },
  { key: "u3", title: "الوحدة 3: المهارات والخصائص والقيم اللازمة لتقديم الرعاية" },
  { key: "u4", title: "الوحدة 4: توفير البيئات الآمنة في الرعاية الصحية والاجتماعية" },
  { key: "u5", title: "الوحدة 5: الخبرة المهنية في مجال الرعاية الصحية أو الاجتماعية" },
  { key: "u7", title: "الوحدة 7: علم التشريح وعلم وظائف الأعضاء للرعاية الصحية والاجتماعية" },
  { key: "u8", title: "الوحدة 8: النشاطات الإبداعية والعلاجية في مجال الرعاية الصحية والاجتماعية" },
];

const buildSemester = (): SemesterData => {
  const specs: ResourceFile[] = UNITS.map((u) => ({
    name: `جدول المواصفات ${u.title}`,
    url: SPECS_URL,
    type: "pdf",
  }));
  const books: ResourceFile[] = UNITS.map((u) => ({
    name: `كتاب ${u.title}`,
    url: BOOKS[u.key],
    type: "pdf",
  }));
  const explanations: ResourceFile[] = UNITS.map((u) => ({
    name: `شرح + سلايدات ${u.title}`,
    url: EXPLANATIONS[u.key],
    type: "presentation",
  }));
  const assignments: ResourceFile[] = UNITS.map((u) => ({
    name: `مهمة ${u.title}`,
    url: ASSIGNMENTS[u.key],
    type: "doc",
  }));
  const teacherGuide: ResourceFile[] = UNITS.map((u) => ({
    name: `دليل المعلم ${u.title}`,
    url: TEACHER[u.key],
    type: "doc",
  }));
  return {
    specs: { files: specs },
    books: { files: books },
    explanations: { files: explanations },
    teacherGuide: { files: teacherGuide },
    assignments: { files: assignments },
  };
};

const grade10: GradeData = {
  semester1: buildSemester(),
  semester2: buildSemester(),
  semester3: buildSemester(),
};

const emptySemester: SemesterData = {
  specs: { files: [] },
  books: { files: [] },
  explanations: { files: [] },
  teacherGuide: { files: [] },
  assignments: { files: [] },
};
const emptyGrade: GradeData = {
  semester1: { ...emptySemester },
  semester2: { ...emptySemester },
  semester3: { ...emptySemester },
};

export const HEALTHCARE_RESOURCES: DepartmentResources = {
  grade10,
  grade11: JSON.parse(JSON.stringify(emptyGrade)),
  grade12: JSON.parse(JSON.stringify(emptyGrade)),
};
