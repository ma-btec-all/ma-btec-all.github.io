import type { DepartmentResources, GradeData, SemesterData, ResourceFile } from "./assistanceResources";

const SPECS_URL = "https://drive.google.com/file/d/1DiWeW-YVZ-NX7LRouXxoQyvcwSY7LDI0/view?usp=drive_link";

const UNITS = [
  {
    key: "u1",
    title: "الوحدة 1: مبادئ اللياقة البدنية واختبارات اللياقة البدنية",
    book: "https://drive.google.com/file/d/1VB70ffM35Cniz6l2YCVOT_5dOSAeaAQ1/view?usp=drive_link",
    explanation: "https://docs.google.com/presentation/d/17mJseq1O3dP6Cx68Lo_uw-catWrpj8ta/edit",
    assignment: "https://docs.google.com/document/d/1p9sloX65UvPgor9mjl69B3N1OIe4SuRD/edit",
    teacher: "https://docs.google.com/document/d/1dTxbs5lzhahEha0qcxzQnsQineuIcET5/edit",
  },
  {
    key: "u2",
    title: "الوحدة 2: التدريب للتمتع باللياقة البدنية الشخصية",
    book: "https://drive.google.com/file/d/1EqO5y-lNplm27a2bocJXVBEMHumJuhWi/view?usp=drive_link",
    explanation: "https://docs.google.com/presentation/d/1N45gXmRNjEtB0DmIv_BkHXdVbAc_QjMS/edit",
    assignment: "https://docs.google.com/document/d/1qrxG9z9a8Os7_Dq6vgwYsu9OITW21z4A/edit",
    teacher: "https://docs.google.com/document/d/1MS3Fvb-CfYb1neMwaFig21Tnx_V8sN2Q/edit",
  },
  {
    key: "u3",
    title: "الوحدة 3: مهارات الأعمال التجارية في مجال الرياضة",
    book: "https://drive.google.com/file/d/1s5tkGsgXI3uBFxNd0aHPSAjd7ULTSozd/view?usp=drive_link",
    explanation: "https://docs.google.com/presentation/d/1ZA0tHj0_6GhRoFQJkjD8go19WcdmwXve/edit",
    assignment: "https://docs.google.com/document/d/1Nyb9nBA6SjevytzhRJLkcqGNYX7phUw6/edit",
    teacher: "https://docs.google.com/document/d/1Kg3eSOPePpMZ08Cwq4xi_pfyLWzRZ1Li/edit",
  },
  {
    key: "u4",
    title: "الوحدة 4: التطوير في مجال الرياضة",
    book: "https://drive.google.com/file/d/1BC94n7vj-RdiCs2nMTAMNDHTpyjbDHrj/view?usp=drive_link",
    explanation: "https://docs.google.com/presentation/d/1yE21tRJhk5LdaxT3Ex94qTm1Eq5HQ0P9/edit",
    assignment: "https://docs.google.com/document/d/1bzI7gLvTN3vUh7C394CD6V17GP1-PA-e/edit",
    teacher: "https://docs.google.com/document/d/1NJ0fpX_XH1GqA_4L29MJ2hCZSU3T1Mzh/edit",
  },
  {
    key: "u5",
    title: "الوحدة 5: الرياضة التطبيقية",
    book: "https://drive.google.com/file/d/1KmilTpMPeJ4jqtuLAuQj8ZgxPtBDKL2O/view?usp=drive_link",
    explanation: "https://docs.google.com/presentation/d/1UOwbUYyOPPnYjA8-JyCCHfxH8PlNVfMl/edit",
    assignment: "https://docs.google.com/document/d/11IJ1XdFgR4vOInUQNGORiXi2bVMiJncY/edit",
    teacher: "https://docs.google.com/document/d/1h4dmg4Qhc8n2Pz26-4N2bq0WOmYHDhXA/edit",
  },
  {
    key: "u6",
    title: "الوحدة 6: القيادة في مجال الرياضة",
    book: "https://drive.google.com/file/d/1nfIYtij6LInHZsGulFZ_rPWulZnjuIYn/view?usp=drive_link",
    explanation: "https://docs.google.com/presentation/d/1vFiNDgtIOvCmayZKHJ0bsuS5ZizCxB2R/edit",
    assignment: "https://docs.google.com/document/d/1oivib4VLEoL2AE_iL86X4KAI1C39QW-t/edit",
    teacher: "https://docs.google.com/document/d/1S9Art93qvwEBmKvptvgpuJ-T-4oudqLf/edit",
  },
  {
    key: "u7",
    title: "الوحدة 7: علم التشريح وعلم وظائف الأعضاء في مجال الرياضة",
    book: "https://drive.google.com/file/d/1lnfBg0cMRL5FeVvpvor3oYbljbb_vzBu/view?usp=drive_link",
    explanation: "https://docs.google.com/presentation/d/12ogftqxDzd_v5QdR0dh5ogBjqN8N7VPq/edit",
    assignment: "https://docs.google.com/document/d/1nRZyla7xEYIvQ1vb4E_IxKmqHf_S7G-7/edit",
    teacher: "https://docs.google.com/document/d/1Q8Sh09ec-A_75nT2JTtahWAy5hjHv_GP/edit",
  },
];

const sem1: SemesterData = {
  specs: {
    files: UNITS.map<ResourceFile>((u) => ({
      name: `جدول المواصفات ${u.title}`,
      url: SPECS_URL,
      type: "pdf",
    })),
  },
  books: {
    files: UNITS.map<ResourceFile>((u) => ({ name: `كتاب ${u.title}`, url: u.book, type: "pdf" })),
  },
  explanations: {
    files: UNITS.map<ResourceFile>((u) => ({
      name: `شرح + سلايدات ${u.title}`,
      url: u.explanation,
      type: "presentation",
    })),
  },
  assignments: {
    files: UNITS.map<ResourceFile>((u) => ({ name: `مهمة ${u.title}`, url: u.assignment, type: "doc" })),
  },
  teacherGuide: {
    files: UNITS.map<ResourceFile>((u) => ({
      name: `دليل المعلم ${u.title}`,
      url: u.teacher,
      type: "doc",
    })),
  },
};

const emptySemester: SemesterData = {
  specs: { files: [] },
  books: { files: [] },
  explanations: { files: [] },
  teacherGuide: { files: [] },
  assignments: { files: [] },
};

export const SPORTS_RESOURCES: DepartmentResources = {
  grade10: {
    semester1: sem1,
    semester2: { ...emptySemester },
    semester3: { ...emptySemester },
  },
  grade11: {
    semester1: { ...emptySemester },
    semester2: { ...emptySemester },
    semester3: { ...emptySemester },
  },
  grade12: {
    semester1: { ...emptySemester },
    semester2: { ...emptySemester },
    semester3: { ...emptySemester },
  },
};
