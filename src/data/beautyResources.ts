import type { DepartmentResources, GradeData, SemesterData, ResourceFile } from "./assistanceResources";

const emptySemester = (): SemesterData => ({
  specs: { files: [] },
  books: { files: [] },
  explanations: { files: [] },
  teacherGuide: { files: [] },
  assignments: { files: [] },
});

// الصف العاشر — الكتب موزعة على 3 فصول
const grade10_s1_books: ResourceFile[] = [
  {
    name: "كتاب استكشاف مجال العناية بالشعر",
    url: "https://drive.google.com/file/d/1-k-5HI-4LepULvxxWfPjZFG1fM6dp0mH/view",
    type: "pdf",
  },
  {
    name: "كتاب الجلد والشعر والأظافر",
    url: "https://drive.google.com/file/d/1yblVQFggISVSYm7n41MXSIzdIoFvPsVL/view",
    type: "pdf",
  },
];

const grade10_s2_books: ResourceFile[] = [
  {
    name: "كتاب مهام الاستقبال في الصالون",
    url: "https://drive.google.com/file/d/1V5GGBtvxhk9s_2YIogkmU6v20APfFNSn/view",
    type: "pdf",
  },
  {
    name: "كتاب ترويج وبيع المنتجات والخدمات للعملاء في الصالون",
    url: "https://drive.google.com/file/d/1YJCE2BJmkuDO5pjxFjaA3mAFdr33clyK/view",
    type: "pdf",
  },
  {
    name: "كتاب شامبو وبلسم الشعر",
    url: "https://drive.google.com/file/d/1RcamF28i-GHglI62261Wd04Vzl2SYrAZ/view",
    type: "pdf",
  },
  {
    name: "كتاب فن تصفيف الشعر",
    url: "https://drive.google.com/file/d/11ut3mOlpZ8x_R7x969RgJjnD9E9X3CvX/view",
    type: "pdf",
  },
  {
    name: "كتاب فن تزيين الأظافر",
    url: "https://drive.google.com/file/d/1_F83LyaHHCbdVQ3oB8RQccG3LsUCaw4z/view",
    type: "pdf",
  },
];

const grade10_s3_books: ResourceFile[] = [
  {
    name: "كتاب تقديم خدمات العناية ببشرة الوجه",
    url: "https://drive.google.com/drive/folders/1cCV0YHFjti6LN5VAsokacbSEWVUyrJHc?usp=drive_link",
    type: "folder",
  },
  {
    name: "كتاب تطبيق مستحضرات التجميل",
    url: "https://drive.google.com/file/d/1EUEBCrXNRhigkVQmP071RK-wO5dqqaez/view",
    type: "pdf",
  },
  {
    name: "كتاب تطبيق تقنيات المانيكير والباديكير",
    url: "https://drive.google.com/file/d/1HrytQWQlPm4XYa0XAlduelu5MLFWBTV3/view",
    type: "pdf",
  },
  {
    name: "كتاب المؤسسة التجارية",
    url: "https://drive.google.com/file/d/1rhDxbivDJIdFB1eK_e2Gbu4tm0lQZAxS/view",
    type: "pdf",
  },
  {
    name: "كتاب تقنيات إزالة الشعر",
    url: "https://drive.google.com/file/d/170CxnnqNRb-euGkR-ulILRvsWuqYs1Si/view",
    type: "pdf",
  },
];

// الصف الأول ثانوي
const grade11_s1_books: ResourceFile[] = [
  {
    name: "كتاب تدريب صالون التجميل المهني",
    url: "https://drive.google.com/file/d/1YeT647N2cS5goDOMnlS70o-TRn_IHfJ7/view",
    type: "pdf",
  },
];
const grade11_s2_books: ResourceFile[] = [
  {
    name: "كتاب الصحة والتعافي",
    url: "https://drive.google.com/file/d/1aYy2T9E01_EXADAfzICgfXl1IrIXeMLo/view",
    type: "pdf",
  },
  {
    name: "كتاب الأساليب المتقدمة للعناية بالأظافر وتجميلها",
    url: "https://drive.google.com/file/d/1V1o5AbsbquSCTTQpiC2Adao5kE-f4nG4/view",
    type: "pdf",
  },
];
const grade11_s3_books: ResourceFile[] = [
  {
    name: "كتاب علاجات البشرة المتقدمة",
    url: "https://drive.google.com/file/d/1oZ931CKpxCqZ_efpuGfFiGFQ9yE88a2e/view",
    type: "pdf",
  },
  {
    name: "كتاب المكياج الإبداعي وفن الحناء",
    url: "https://drive.google.com/file/d/1MAJRzzkUd1VFTpJBxsNQ933By6UTfjXt/view",
    type: "pdf",
  },
  {
    name: "كتاب تلوين وتفتيح الشعر وتقنية الهايلايت",
    url: "https://drive.google.com/file/d/122u1oGe-KmpYfY_U114r2Bfb7mreuJMk/view",
    type: "pdf",
  },
  {
    name: "كتاب نظرة عامة على البيع والترويج",
    url: "https://drive.google.com/file/d/1m-xyzGcfEaZqrdSz5Ak_e1TMkOu7KPGX/view",
    type: "pdf",
  },
];

// الصف الثاني ثانوي
const grade12_s1_books: ResourceFile[] = [
  {
    name: "كتاب قص الشعر والتصفيف",
    url: "https://drive.google.com/file/d/1VcfrmPENF9scOfam3aLQomcwLn6MUuVK/view",
    type: "pdf",
  },
];
const grade12_s2_books: ResourceFile[] = [
  {
    name: "كتاب التدليك والعلاج بالروائح العطرية",
    url: "https://drive.google.com/file/d/14L8NMLqCNPEsBCNkiGGy3RTwCSa6GNpQ/view",
    type: "pdf",
  },
];
const grade12_s3_books: ResourceFile[] = [
  {
    name: "كتاب بدء مشروع وإدارته",
    url: "https://drive.google.com/file/d/1TpyLCW64x-uKfineBSqEIqyLrKmToLXE/view",
    type: "pdf",
  },
];

const buildSem = (books: ResourceFile[]): SemesterData => ({
  ...emptySemester(),
  books: { files: books },
});

export const BEAUTY_RESOURCES: DepartmentResources = {
  grade10: {
    semester1: buildSem(grade10_s1_books),
    semester2: buildSem(grade10_s2_books),
    semester3: buildSem(grade10_s3_books),
  },
  grade11: {
    semester1: buildSem(grade11_s1_books),
    semester2: buildSem(grade11_s2_books),
    semester3: buildSem(grade11_s3_books),
  },
  grade12: {
    semester1: buildSem(grade12_s1_books),
    semester2: buildSem(grade12_s2_books),
    semester3: buildSem(grade12_s3_books),
  },
};
