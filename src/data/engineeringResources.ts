/**
 * موارد تخصص الهندسة (العاشر، الأول ثانوي، الثاني ثانوي بمساراته).
 * الروابط وفق ما أرسله المستخدم.
 */

type FType = "pdf" | "doc" | "presentation" | "folder";
type F = { name: string; url: string; type: FType };

const f = (name: string, url: string, type: FType = "pdf"): F => ({ name, url, type });

const S = (partial: Partial<{ books: F[]; specs: F[]; explanations: F[]; teacherGuide: F[]; assignments: F[] }>) => ({
  books: { files: partial.books ?? [] },
  specs: { files: partial.specs ?? [] },
  explanations: { files: partial.explanations ?? [] },
  teacherGuide: { files: partial.teacherGuide ?? [] },
  assignments: { files: partial.assignments ?? [] },
});

const G10_SPEC = "https://drive.google.com/file/d/1axeX7KrBJJw-6lY-D-yv7EIjo9s60ozo/view?usp=drive_link";
const G11_SPEC = "https://drive.google.com/file/d/1FEyyokQDbpmW_2ncpRKGJchas07iil7W/view?usp=drive_link";
const G12_EL_SPEC = "https://drive.google.com/file/d/1KEaAsN-RZIvhOewroVyAo2-31TSqp2LJ/view?usp=drive_link";
const G12_ME_SPEC = "https://drive.google.com/file/d/1_-cY2SyKY2OrL-kexN7_GJ-BJ9dwy6FA/view?usp=sharing";
const G12_VT_SPEC = "https://drive.google.com/file/d/1GDHFHOhwZgzw96KJN2stJe153DqxaS_J/view?usp=sharing";

const grade10: {
  semester1: ReturnType<typeof S>;
  semester2: ReturnType<typeof S>;
  semester3: ReturnType<typeof S>;
} = {
  semester1: S({
    specs: [
      f("جدول المواصفات — العمل بأمان وفاعلية في الورشة الهندسية", G10_SPEC),
      f("جدول المواصفات — مهارات في المسائل الهندسية لابتكار الحلول", G10_SPEC),
      f("جدول المواصفات — التحقق من منتج هندسي", G10_SPEC),
      f("جدول المواصفات — الصيانة الهندسية", G10_SPEC),
    ],
    books: [
      f("كتاب العمل بأمان وفاعلية في الورشة الهندسية", "https://drive.google.com/file/d/1zEnftn-sUj9vrgXgaj6IT_BaRPUv4QE5/view"),
      f("كتاب مهارات في المسائل الهندسية لابتكار الحلول", "https://drive.google.com/file/d/1VDUfHpJ9qTzFEt6Bp4etDPR5wJeDtpQF/view"),
      f("كتاب التحقق من منتج هندسي", "https://drive.google.com/file/d/1yIubxopc1aTJgo21Pat0WjOTzkAwAUo6/view"),
      f("كتاب الصيانة الهندسية", "https://drive.google.com/file/d/1d7GZA3vvEwSFNdtAfKFKAjCcWnHNbTTi/view"),
    ],
    explanations: [
      f("شرح العمل بأمان وفاعلية في الورشة الهندسية", "https://docs.google.com/presentation/d/1b73Qxy10lorAyYW5TEIgHu7W4FPQfgkw/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
      f("شرح مهارات في المسائل الهندسية لابتكار الحلول", "https://docs.google.com/presentation/d/1nrae6V3A8ncCufV4UbO9pfMaoqntdRUD/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
    ],
    teacherGuide: [
      f("دليل المعلم — العمل بأمان وفاعلية في الورشة الهندسية", "https://docs.google.com/document/d/190HmXqZNzDi--xQWkZJrT2mR941ZxUEU/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("دليل المعلم — مهارات في المسائل الهندسية لابتكار الحلول", "https://docs.google.com/document/d/10epByDD49S9KfBJfEon0vypiX8qmifQB/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("دليل المعلم — التحقق من منتج هندسي", "https://docs.google.com/document/d/19QDCkGumBi1FFkhBTOV_zRhufnxrf5qP/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("دليل المعلم — الصيانة الهندسية", "https://docs.google.com/document/d/1jKYPatwhYbS7uy3H_5q4NBC8Qt_XV-NM/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
    assignments: [
      f("مهمة العمل بأمان وفاعلية في الورشة الهندسية (أ + ب)", "https://docs.google.com/document/d/1wljDz1-bJwJEVfwADb_PkHqE6kNVdGrz/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("مهمة مهارات في المسائل الهندسية لابتكار الحلول (أ)", "https://docs.google.com/document/d/1cI7Am5loyBM03oSsT_5Zeat8Faso5z9b/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("مهمة التحقق من منتج هندسي (أ + ب)", "https://docs.google.com/document/d/19JiFjVTMxP4hVtYpvMM0L0o7aSY9SIw5/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("مهمة الصيانة الهندسية (أ + ب)", "https://docs.google.com/document/d/1AaSs5d1W3hr5mqh8k2ZX8DS_Hvhko3p1/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
  }),
  semester2: S({
    specs: [
      f("جدول المواصفات — الرياضيات لفني الهندسي", G10_SPEC),
      f("جدول المواصفات — المواد الهندسية", G10_SPEC),
      f("جدول المواصفات — إنشاء الدوائر الكهربائية والإلكترونية واختبارها", G10_SPEC),
      f("جدول المواصفات — البرمجة العامة", G10_SPEC),
      f("جدول المواصفات — تقنيات صيانة المركبات", G10_SPEC),
    ],
    books: [
      f("كتاب الرياضيات لفني الهندسي", "https://drive.google.com/file/d/1fBOienHtGRz9rZ5VtK0_iik8ACpXqFWx/view"),
      f("كتاب المواد الهندسية", "https://drive.google.com/file/d/1MY9ZL6ykFsdFW38OMgVJKty1IJcW2M63/view"),
      f("كتاب إنشاء الدوائر الكهربائية والإلكترونية واختبارها", "https://drive.google.com/file/d/11grQ1vPzaK_WOAwtwcMI0GMNtYaci4Ft/view"),
      f("كتاب البرمجة العامة", "https://drive.google.com/file/d/1qd7BIlPs9-Nxzo_IfBNmM5CWr1wA6VMY/view"),
      f("كتاب تقنيات صيانة المركبات", "https://drive.google.com/file/d/1aa0TScs88l4KayZi5Kfe6nvv46aGZjXF/view"),
    ],
    explanations: [
      f("شرح الرياضيات لفني الهندسي", "https://docs.google.com/presentation/d/1Gx9fJpn1GzHHgVehAnWh3fICdf6FAjnw/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
      f("شرح المواد الهندسية", "https://docs.google.com/presentation/d/1q2JKTAITvake3V5vrYsoHs3zv8-k8wCo/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
      f("شرح إنشاء الدوائر الكهربائية والإلكترونية واختبارها", "https://docs.google.com/presentation/d/1uUQNYsUDBiwY3ilNGdXDXYRmkIn_Gzu8/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
      f("شرح البرمجة العامة", "https://docs.google.com/presentation/d/1l0Lk1wVvc6sSsdOycILiKA5IB510HSEo/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
      f("شرح تقنيات صيانة المركبات", "https://docs.google.com/presentation/d/1bkGPfbucNmeilpbdgFsYBRZ1f2Eb3Uwt/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
    ],
    teacherGuide: [
      f("دليل المعلم — الرياضيات لفني الهندسي", "https://docs.google.com/document/d/1t9HPTO2wxXsEMjgPuV-Y4knAcZguecRf/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("دليل المعلم — المواد الهندسية", "https://docs.google.com/document/d/1k_g9qdONjnJamD-PPU2hnjWnN8TPvSxO/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("دليل المعلم — إنشاء الدوائر الكهربائية والإلكترونية واختبارها", "https://docs.google.com/document/d/18ltL0rcuHqcY-5fbKTRQQrbljCt14P15/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("دليل المعلم — البرمجة العامة", "https://docs.google.com/document/d/100FfsUkeo2VGztWNDRED4Y2pLNWI5N6B/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("دليل المعلم — تقنيات صيانة المركبات", "https://docs.google.com/document/d/1TctKvueDMeQV__9YIfhNrrs_RQOcdtLh/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
    assignments: [
      f("مهمة الرياضيات لفني الهندسي (أ)", "https://docs.google.com/document/d/1mUyV1oHi-lWDz5HDAJ87hT9OGTbpYpCk/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("مهمة المواد الهندسية (أ)", "https://docs.google.com/document/d/1JbjGZfXrSyJ8MB5Hxihvk3ZNAQNCMbgr/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("مهمة إنشاء الدوائر الكهربائية والإلكترونية واختبارها (أ + ب)", "https://docs.google.com/document/d/18HlpBzsc4zQpkg5AYfecOEPKy6s__cuS/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("مهمة البرمجة العامة (أ)", "https://docs.google.com/document/d/1PWqunnKHDKIENCs2lM5cAs1ghvYtjHg4/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("مهمة تقنيات صيانة المركبات (أ)", "https://docs.google.com/document/d/18ybffJaobSO4jfmv22DPG2MytMtWOdol/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
  }),
  semester3: S({
    specs: [
      f("جدول المواصفات — الرسم الهندسي", G10_SPEC),
      f("جدول المواصفات — تقنيات تحسين الإدارة", G10_SPEC),
      f("جدول المواصفات — تقنيات التصنيع", G10_SPEC),
      f("جدول المواصفات — العلوم الكهربائية والميكانيكة الهندسية", G10_SPEC),
    ],
    books: [
      f("كتاب الرسم الهندسي", "https://drive.google.com/file/d/1QXgi2fF8pcHSKJ561rSC_LCedgeHEfp-/view"),
      f("كتاب تقنيات تحسين الإدارة", "https://drive.google.com/file/d/1o2n0R3htgfNFW7gXf2HX50esnYosAZaa/view"),
      f("كتاب تقنيات التصنيع", "https://drive.google.com/file/d/1N7fzE_36yJhNKib8zMxuhgDRnTFph_PW/view"),
      f("كتاب العلوم الكهربائية والميكانيكة الهندسية", "https://drive.google.com/file/d/1aEPyTIF-rpilxoC4GFdWfRtai3mYe8UR/view"),
      f("كتاب تشغيل وصيانة الأنظمة والمكونات الكهربائية والإلكترونية", "https://drive.google.com/file/d/1T6Z5gPi93_CnwNPft3Q7SR_PnqjneaxZ/view"),
    ],
    explanations: [
      f("شرح الرسم الهندسي", "https://docs.google.com/presentation/d/1NqdzkSvqqOF8YYLCEuMkR4TNfjSg24MJ/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
      f("شرح اللحام", "https://docs.google.com/presentation/d/1IX7iQitlDX6QTW9J-VyMKNrNbg-WVNpe/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
      f("شرح تقنيات تحسين الإدارة", "https://docs.google.com/presentation/d/1DgyO3LOv9AnPxWNNt9ObOBLrkC4fW82r/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
      f("شرح تقنيات التصنيع", "https://docs.google.com/presentation/d/1XOgQg8RIqcNp8t4C-35IRvvUsbsPtt0O/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
      f("شرح العلوم الكهربائية والميكانيكة الهندسية", "https://docs.google.com/presentation/d/1NxakRWa-sefMeZo99yWhqh73dCVARGXq/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
      f("شرح تشغيل وصيانة الأنظمة والمكونات الكهربائية والإلكترونية", "https://docs.google.com/presentation/d/1PUrBdgTUboyHeYXE1U5-ScaCRvG2bQG9/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
    ],
    teacherGuide: [
      f("دليل المعلم — الرسم الهندسي", "https://docs.google.com/document/d/1p8edcNIUtJF41KDety_VchNKPnhdtjlf/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("دليل المعلم — اللحام", "https://docs.google.com/document/d/1lAcc0kLNoawnXg3DkvX8WjYZgpvqkaqR/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("دليل المعلم — تقنيات تحسين الإدارة", "https://docs.google.com/document/d/1KjycNv6nNlDUZ0-653PwepMyb2qupwgl/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("دليل المعلم — تقنيات التصنيع", "https://docs.google.com/document/d/1xRIKfNoOmmvHjfitn6tFbI5nGCEobpD7/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("دليل المعلم — العلوم الكهربائية والميكانيكة الهندسية", "https://docs.google.com/document/d/1O4qzjya23PfcwwCBaW76rZFEbcNkVoZ0/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("دليل المعلم — تشغيل وصيانة الأنظمة والمكونات الكهربائية والإلكترونية", "https://docs.google.com/document/d/13WOqhyOKLYsKr6Qd-R908eBw_iQVevd2/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
    assignments: [
      f("مهمة الرسم الهندسي (أ)", "https://docs.google.com/document/d/1nSqiz54cgzB2LHSsC3OFERjY7M_n2YPg/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("مهمة اللحام (أ + ب)", "https://docs.google.com/document/d/1oEhfRmOaT2WNa9R9aaevD_R_LdawaMEA/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("مهمة تقنيات تحسين الإدارة (أ)", "https://docs.google.com/document/d/1j1p4S4q0uAf9McjdENs5sZzsghtwLh_i/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("مهمة تقنيات التصنيع (أ)", "https://docs.google.com/document/d/1Q06Ee1RV6a4dF5YQ4Xh3Y2ekDS-EdA4r/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("مهمة العلوم الكهربائية والميكانيكة الهندسية (أ)", "https://docs.google.com/document/d/1TG2R-H6xZKEDcXmi_A3O33ls-L28QHoG/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("مهمة تشغيل وصيانة الأنظمة والمكونات الكهربائية والإلكترونية (أ)", "https://docs.google.com/document/d/1FMkxXeWnQW_l0TUmuJZsh0p2K-IC99_Z/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
  }),
};

const grade11 = {
  semester1: S({
    specs: [
      f("جدول المواصفات — المبادئ الميكانيكية", G11_SPEC),
      f("جدول المواصفات — المبادئ الكهربائية والإلكترونية", G11_SPEC),
    ],
    books: [
      f("كتاب المبادئ الميكانيكية", "https://drive.google.com/file/d/1yPiDnK9IHkxaVG9lGR6Fo8v164ZW4O8K/view"),
      f("كتاب المبادئ الكهربائية والإلكترونية", "https://drive.google.com/file/d/1CSeNGDRPzRCPER9QIdOK574JQCX-dlQG/view"),
    ],
    explanations: [
      f("شرح المبادئ الميكانيكية", "https://docs.google.com/presentation/d/1CxDIMfNarJ5DqqJLJiBZiaYs-yMdhs4Q/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
      f("شرح المبادئ الكهربائية والإلكترونية", "https://docs.google.com/presentation/d/1gjDNOBgjlYfHoTgj07RlfDpFnVGsi8Hc/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
    ],
    teacherGuide: [
      f("دليل المعلم — المبادئ الميكانيكية", "https://docs.google.com/document/d/1dQZ1k1ha4hkczGWehYFd-2TVA_t4Ns8l/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("دليل المعلم — المبادئ الكهربائية والإلكترونية", "https://docs.google.com/document/d/1G_CrYWkrKLEY_iVnO7IYyy9l3DSJDUI9/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
    assignments: [
      f("مهمة المبادئ الميكانيكية", "https://docs.google.com/document/d/18HHGTNcchOa_KxdCxRmPC6iDAMDHIXJ5/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("مهمة المبادئ الكهربائية والإلكترونية", "https://docs.google.com/document/d/1HnV9aiJ5Ls18FpUv9DOT7FXk9uBRyY9i/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
  }),
  semester2: S({
    specs: [
      f("جدول المواصفات — مبادئ التجارة والجودة التطبيقية بالهندسة", G11_SPEC),
      f("جدول المواصفات — تقديم العمليات الهندسية بأمان كفريق", G11_SPEC),
    ],
    books: [
      f("كتاب مبادئ التجارة والجودة التطبيقية بالهندسة", "https://drive.google.com/file/d/1ulu55FQZCyiI1hbXUQ4hT_oFSqP8HLdH/view"),
      f("كتاب تقديم العمليات الهندسية بأمان كفريق", "https://drive.google.com/file/d/1kM1Ulr3PaT1PtrzcL00xV0WhuO9dgXoN/view"),
    ],
    explanations: [
      f("شرح تقديم العمليات الهندسية بأمان كفريق", "https://docs.google.com/presentation/d/1EFq0dB73TdWM0jNg9ID_Zzp3NbGGfbdJ/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
      f("شرح مبادئ التجارة والجودة التطبيقية بالهندسة", "https://docs.google.com/presentation/d/1dLHljY2mrMc3HaIVdqFbVfnIELRj7ZEq/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
    ],
    teacherGuide: [
      f("دليل المعلم — تقديم العمليات الهندسية بأمان كفريق", "https://docs.google.com/document/d/1oL4czW84mF_CvLruqhnam3YDfYcVNARd/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("دليل المعلم — مبادئ التجارة والجودة التطبيقية بالهندسة", "https://docs.google.com/document/d/1jaw6Jii3ENwGCpw-CuBnXgmgiy5djurO/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
    assignments: [
      f("مهمة تقديم العمليات الهندسية بأمان كفريق", "https://docs.google.com/document/d/1JvF_s6JIeAR4H1_R9-4KOjKObwJNG4-o/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("مهمة مبادئ التجارة والجودة التطبيقية بالهندسة", "https://docs.google.com/document/d/12pHQ8qn5BasGU-zFAF_v_ZVvAXeL5IhX/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
  }),
  semester3: S({
    specs: [f("جدول المواصفات — تصميم وتصنيع المنتجات في مجال الهندسة", G11_SPEC)],
    books: [f("كتاب تصميم وتصنيع المنتجات في مجال الهندسة", "https://drive.google.com/file/d/1p4rfw2j8Gzscb8o4Lk9oKBDMqlrCqvWe/view")],
    explanations: [
      f("شرح تصميم وتصنيع المنتجات في مجال الهندسة", "https://docs.google.com/presentation/d/1MQx2RDUKS7CuTNv1SIGV7i8-l1qEzfMr/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
      f("شرح أنظمة التصنيع الحديثة", "https://docs.google.com/presentation/d/14TKy1fWX7k4bJ44rwxk5Mw-jfFCHbPnr/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
    ],
    teacherGuide: [
      f("دليل المعلم — تصميم وتصنيع المنتجات في مجال الهندسة", "https://docs.google.com/document/d/1judikx3Kh-GyWHOyUgbnVbmYtZ2WZ2Y7/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("دليل المعلم — أنظمة التصنيع الحديثة", "https://docs.google.com/document/d/1KoWE7YaVttLYrZvhv4y5GylbkIzbLFkJ/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
    assignments: [
      f("مهمة تصميم وتصنيع المنتجات في مجال الهندسة", "https://docs.google.com/document/d/1jfWqh2BntcizeAg5L99k8cXkmQgfNWZ4/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("مهمة أنظمة التصنيع الحديثة", "https://docs.google.com/document/d/1JbeLnOHxJ0xZmVRJ15Wt6ms1aTmlI_xu/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
  }),
};

const emptyG12 = {
  semester1: S({}),
  semester2: S({}),
  semester3: S({}),
};

const grade12Electrical = {
  semester1: S({
    specs: [
      f("(تخصص الكهرباء) جدول المواصفات — محركات المركبات الكهربائية والهجينة", G12_EL_SPEC),
      f("(تخصص الكهرباء) جدول المواصفات — الأجهزة والدوائر الإلكترونية", G12_EL_SPEC),
      f("(تخصص الكهرباء) جدول المواصفات — أنظمة الدفع في المركبات الكهربائية", G12_EL_SPEC),
      f("(تخصص الكهرباء) جدول المواصفات — الدوائر الإلكترونية التناظرية", G12_EL_SPEC),
    ],
    books: [
      f("(تخصص الكهرباء) كتاب محركات المركبات الكهربائية والهجينة", "https://drive.google.com/file/d/1T6CJjFdmyR2nPH5SSOzlQyQhVitp5oQ4/view"),
      f("(تخصص الكهرباء) كتاب الأجهزة والدوائر الإلكترونية", "https://drive.google.com/file/d/13R4MsKjAk7OYUhC-RovqNs6sCx56lUya/view"),
      f("(تخصص الكهرباء) كتاب أنظمة الدفع في المركبات الكهربائية", "https://drive.google.com/file/d/1HQB1c5SvMFfG_ym5XKAbf1onnn_98lz3/view"),
      f("(تخصص الكهرباء) كتاب الدوائر الإلكترونية التناظرية", "https://drive.google.com/file/d/1jXUzuRbVT8FlZkznUb-s0-4Uq8a4pWhR/view"),
    ],
    explanations: [
      f("شرح + سلايدات — الأجهزة والدوائر الإلكترونية (كهرباء)", "https://docs.google.com/presentation/d/177o2tlt0K69_0ZrCWmPG72PbNsVbi1IM/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
      f("شرح + سلايدات — الدوائر الإلكترونية التناظرية (كهرباء)", "https://docs.google.com/presentation/d/1b73su8qzBmWlG1kf5FdIMRguIPzqBfvg/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
    ],
    assignments: [
      f("مهمة الأجهزة والدوائر الإلكترونية (كهرباء)", "https://docs.google.com/document/d/12IcFbHyFWT0BgZEzTvakkQWQ__Fcbfem/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("مهمة الدوائر الإلكترونية التناظرية (كهرباء)", "https://docs.google.com/document/d/1aD49i52HHyDQ8hpO9--_Jt6pqzhk5_l-/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
    teacherGuide: [
      f("دليل المعلم — الأجهزة والدوائر الإلكترونية (كهرباء)", "https://docs.google.com/document/d/1nyR-C3vuunc5fjR4_A4-DvggUP_Qok3A/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("دليل المعلم — الدوائر الإلكترونية التناظرية (كهرباء)", "https://docs.google.com/document/d/1_dvPJuTKOFh9sC2SO18Qmn6nJWwVCpTq/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
  }),
  semester2: S({
    specs: [
      f("(تخصص الكهرباء) جدول المواصفات — التنقل الكهربي", G12_EL_SPEC),
      f("(تخصص الكهرباء) جدول المواصفات — القياس والاختبار الإلكتروني للدوائر", G12_EL_SPEC),
      f("(تخصص الكهرباء) جدول المواصفات — تشغيل أنظمة الإشعال الإلكترونية في المركبات واختبارها", G12_EL_SPEC),
      f("(تخصص الكهرباء) جدول المواصفات — الأنظمة الإلكترونية التناظرية والرقمية", G12_EL_SPEC),
    ],
    books: [
      f("(تخصص الكهرباء) كتاب التنقل الكهربي", "https://drive.google.com/file/d/1GiQQ8DtEpcJg02BjcFIrimkjxYJU7kPf/view"),
      f("(تخصص الكهرباء) كتاب القياس والاختبار الإلكتروني للدوائر", "https://drive.google.com/file/d/118aQm5c_dwC-614aPrpuj-fVd5e9T7lU/view"),
      f("(تخصص الكهرباء) كتاب تشغيل أنظمة الإشعال الإلكترونية في المركبات واختبارها", "https://drive.google.com/file/d/1kor1zJvGk1QXV_OkxdEgGZ-srBeS5zuH/view"),
      f("(تخصص الكهرباء) كتاب الأنظمة الإلكترونية التناظرية والرقمية", "https://drive.google.com/file/d/1j9Kv63qqtR76RfddxewByANrZbaq87FS/view"),
    ],
    explanations: [
      f("شرح + سلايدات — القياس والاختبار الإلكتروني للدوائر (كهرباء)", "https://docs.google.com/presentation/d/1nocPQcI1GDw97vVQB9QpO4_f9p-fULTf/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
    ],
    assignments: [
      f("مهمة القياس والاختبار الإلكتروني للدوائر (كهرباء)", "https://docs.google.com/document/d/1NZWcLA9cwztgvYEnwIUCCuHF9ulmvADv/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
    teacherGuide: [
      f("دليل المعلم — القياس والاختبار الإلكتروني للدوائر (كهرباء)", "https://docs.google.com/document/d/1XOybsNznyHyOJbIy660j21QumIO55P7-/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
  }),
  semester3: S({
    specs: [
      f("(تخصص الكهرباء) جدول المواصفات — أنظمة التعليق والتوجيه والكبح في المركبات الخفيفة", G12_EL_SPEC),
      f("(تخصص الكهرباء) جدول المواصفات — المتحكمات المنطقية القابلة للبرمجة", G12_EL_SPEC),
      f("(تخصص الكهرباء) جدول المواصفات — تشغيل أنظمة نقل الحركة في المركبات الخفيفة وصيانتها", G12_EL_SPEC),
      f("(تخصص الكهرباء) جدول المواصفات — الروبوتات الصناعية", G12_EL_SPEC),
    ],
    books: [
      f("(تخصص الكهرباء) كتاب أنظمة التعليق والتوجيه والكبح في المركبات الخفيفة", "https://drive.google.com/file/d/1GCVYH609lXukYZvh4e8TcQ4-ITrA2Ot9/view"),
      f("(تخصص الكهرباء) كتاب المتحكمات المنطقية القابلة للبرمجة", "https://drive.google.com/file/d/16K-OxxWq3uxN9ldJCAJKzHzJEH7E9-dd/view"),
      f("(تخصص الكهرباء) كتاب تشغيل أنظمة نقل الحركة في المركبات الخفيفة وصيانتها", "https://drive.google.com/file/d/12YQiwM56IYxS5216TJdFrPBug0dZ88K3/view"),
      f("(تخصص الكهرباء) كتاب الروبوتات الصناعية", "https://drive.google.com/file/d/1ovxU_gXMPYAnfswisxCA5Exvoj55scoG/view"),
    ],
    explanations: [
      f("شرح + سلايدات — المتحكمات المنطقية القابلة للبرمجة (كهرباء)", "https://docs.google.com/presentation/d/1mgYuys75762_goB10dlE0e1aD30r_sQW/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
      f("شرح + سلايدات — الروبوتات الصناعية (كهرباء)", "https://docs.google.com/presentation/d/12C1YsJTwiUTMyQIc2lWzvvGoXQchhIoY/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
    ],
    assignments: [
      f("مهمة المتحكمات المنطقية القابلة للبرمجة (كهرباء)", "https://docs.google.com/document/d/11U_JFuX7Q6d59aD37Bgok-RgwzuNd1F6/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("مهمة الروبوتات الصناعية (كهرباء)", "https://docs.google.com/document/d/1Mu4SJmlTh1v_J66_T-IxTlq3tRZH_Hud/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
    teacherGuide: [
      f("دليل المعلم — المتحكمات المنطقية القابلة للبرمجة (كهرباء)", "https://docs.google.com/document/d/1GWnWmWyIbrfWVTsLNSbkuMLdkfAfC-jp/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("دليل المعلم — الروبوتات الصناعية (كهرباء)", "https://docs.google.com/document/d/1iRgGFrZFIjbpOD5gaL3Ic4yZlQbCDwlW/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
  }),
};

const grade12Mechanics = {
  semester1: S({
    specs: [
      f("(تخصص الميكانيك) جدول المواصفات — تقنية اللحام", G12_ME_SPEC),
      f("(تخصص الميكانيك) جدول المواصفات — صيانة الأنظمة الميكانيكية", G12_ME_SPEC),
    ],
    books: [
      f("(تخصص الميكانيك) كتاب تقنية اللحام", "https://drive.google.com/file/d/1seLNp8l4IBHMjmPbEW19wkbDuWcixRwS/view?usp=drive_link"),
      f("(تخصص الميكانيك) كتاب صيانة الأنظمة الميكانيكية", "https://drive.google.com/file/d/1lDLfub0Hg79bM388PixnhaBs557-YfCq/view"),
    ],
    explanations: [
      f("شرح + سلايدات — تقنية اللحام (ميكانيك)", "https://docs.google.com/presentation/d/1NXxgG3Lj-NluNsmaljNsBPCwvdvgxY51/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
      f("شرح + سلايدات — صيانة الأنظمة الميكانيكية (ميكانيك)", "https://docs.google.com/presentation/d/1egjYvyBuPNebuD7tNWEpI-RDjKYbNppu/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
    ],
    assignments: [
      f("مهمة تقنية اللحام (ميكانيك)", "https://docs.google.com/document/d/1MqJOUNwu0NBcAZAD8v03SfKx7EBy6-Qx/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("مهمة صيانة الأنظمة الميكانيكية (ميكانيك)", "https://docs.google.com/document/d/1R1wt5s0ZyNzlSmrA_uAAcMjo_r-CziOP/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
    teacherGuide: [
      f("دليل المعلم — تقنية اللحام (ميكانيك)", "https://docs.google.com/document/d/1YDObIvLGiOoQVgqpZzKpomFkWZqWY613/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("دليل المعلم — صيانة الأنظمة الميكانيكية (ميكانيك)", "https://docs.google.com/document/d/1FFtt_Wx0CMAh7FhxF7Ru5yQU5WQ5dQy2/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
  }),
  semester2: S({
    specs: [
      f("(تخصص الميكانيك) جدول المواصفات — السلوك الميكانيكي للمواد المعدنية", G12_ME_SPEC),
      f("(تخصص الميكانيك) جدول المواصفات — السلوك الميكانيكي للمواد غير المعدنية", G12_ME_SPEC),
    ],
    books: [
      f("(تخصص الميكانيك) كتاب السلوك الميكانيكي للمواد المعدنية", "https://drive.google.com/file/d/1guD0rpTjACflKYO38WRxtyjMPQ39YMck/view"),
      f("(تخصص الميكانيك) كتاب السلوك الميكانيكي للمواد غير المعدنية", "https://drive.google.com/file/d/1dgnkUpoZwgJqKi-vKY_1S5kHMFlgl05d/view"),
    ],
    explanations: [
      f("شرح + سلايدات — السلوك الميكانيكي للمواد المعدنية (ميكانيك)", "https://docs.google.com/presentation/d/1TvbdjBmrb5mQGMUdmCj6wihJn16ZM7kZ/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
      f("شرح + سلايدات — السلوك الميكانيكي للمواد غير المعدنية (ميكانيك)", "https://docs.google.com/presentation/d/1ahUeboLpN58r6xkJCTF3H1xtGii_SFtV/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
    ],
    assignments: [
      f("مهمة السلوك الميكانيكي للمواد المعدنية (ميكانيك)", "https://docs.google.com/document/d/1I2Y5qg87iIt9y4v2cny4LeQqWqfsYLjc/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("مهمة السلوك الميكانيكي للمواد غير المعدنية (ميكانيك)", "https://docs.google.com/document/d/1ZPQQda5Ct3sBXpfaKp3dqs45VRHNeLZQ/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
    teacherGuide: [
      f("دليل المعلم — السلوك الميكانيكي للمواد المعدنية (ميكانيك)", "https://docs.google.com/document/d/1CahLsASmQHLjLphOdOrl99zXtMi6l191/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("دليل المعلم — السلوك الميكانيكي للمواد غير المعدنية (ميكانيك)", "https://docs.google.com/document/d/1cOFzssUbJYOWqQej22-Azz6zmmEBVje4/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
  }),
  semester3: S({
    specs: [
      f("(تخصص الميكانيك) جدول المواصفات — عمليات المعالجة الآلية الثانوية المستخدمة في التصنيع", G12_ME_SPEC),
      f("(تخصص الميكانيك) جدول المواصفات — عمليات التصنيع والتجميع", G12_ME_SPEC),
    ],
    books: [
      f("(تخصص الميكانيك) كتاب عمليات المعالجة الآلية الثانوية المستخدمة في التصنيع", "https://drive.google.com/file/d/13JOT_hoTvDjWpP_7jqyWBB9Qnxoi6OeM/view"),
      f("(تخصص الميكانيك) كتاب عمليات التصنيع والتجميع", "https://drive.google.com/file/d/1fS2BwPXvWAGv5oXWBxxgN4mQmnzIFUkT/view"),
      f("(تخصص الميكانيك) كتاب عمليات المعالجة الآلية الثانوية (نسخة إضافية)", "https://drive.google.com/file/d/13AUmcVp-QmUirDPbfRf2VBIudo9sTX6F/view"),
    ],
    explanations: [
      f("شرح + سلايدات — عمليات المعالجة الآلية الثانوية (ميكانيك)", "https://docs.google.com/presentation/d/17JrcjmkhAHzzyky6Hds7FHCeGjFrVOLP/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
      f("شرح + سلايدات — المعالجة التصنيعية باستخدام التحكم العددي (ميكانيك)", "https://docs.google.com/presentation/d/1xtoHzz7HVFUc1CjFg0spOVYy0RWqQMQU/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
    ],
    assignments: [
      f("مهمة عمليات المعالجة الآلية الثانوية المستخدمة في التصنيع (ميكانيك)", "https://docs.google.com/document/d/1za2xzxIn6rGoRDIIIkFR6hQg-w6SUW0Q/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
    teacherGuide: [
      f("دليل المعلم — عمليات المعالجة الآلية الثانوية المستخدمة في التصنيع (ميكانيك)", "https://docs.google.com/document/d/1ZLqX2U5Fmb9Hznj9rHlewLElcg8VFIxS/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
  }),
};

const grade12Vehicle = {
  semester1: S({
    specs: [
      f("(تخصص تكنولوجيا المركبات) جدول المواصفات — محركات المركبات الكهربائية والهجينة", G12_VT_SPEC),
      f("(تخصص تكنولوجيا المركبات) جدول المواصفات — أنظمة الدفع في المركبات الكهربائية", G12_VT_SPEC),
    ],
    books: [
      f("(تخصص تكنولوجيا المركبات) كتاب محركات المركبات الكهربائية والهجينة", "https://drive.google.com/file/d/1T6CJjFdmyR2nPH5SSOzlQyQhVitp5oQ4/view"),
      f("(تخصص تكنولوجيا المركبات) كتاب أنظمة الدفع في المركبات الكهربائية", "https://drive.google.com/file/d/1HQB1c5SvMFfG_ym5XKAbf1onnn_98lz3/view"),
    ],
    explanations: [
      f("شرح + سلايدات — محركات المركبات الكهربائية والهجينة (تكنولوجيا المركبات)", "https://docs.google.com/presentation/d/1n_Eq2dxqJf9IW37qpOst1WJDr8NI6seN/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
      f("شرح + سلايدات — أنظمة الدفع في المركبات الكهربائية (تكنولوجيا المركبات)", "https://docs.google.com/presentation/d/1bIk8vqJAhUkT6buLTcKVxsGP2rzyqs7B/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
    ],
    assignments: [
      f("مهمة محركات المركبات الكهربائية والهجينة (تكنولوجيا المركبات)", "https://docs.google.com/document/d/1Hy7nerQd_brWyRTBX3kNCeKGsMjfkCv0/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("مهمة أنظمة الدفع في المركبات الكهربائية (تكنولوجيا المركبات)", "https://docs.google.com/document/d/1KenmErA1J7_mTYHTHyMW8hqDQS2McgqN/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
    teacherGuide: [
      f("دليل المعلم — محركات المركبات الكهربائية والهجينة (تكنولوجيا المركبات)", "https://docs.google.com/document/d/1yLqpEX9sjIMiBU1OE-FgRILnOw5Upj6k/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("دليل المعلم — أنظمة الدفع في المركبات الكهربائية (تكنولوجيا المركبات)", "https://docs.google.com/document/d/175I68sFMJLhSkJqH3DYGXJ_1UZtRYixq/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
  }),
  semester2: S({
    specs: [
      f("(تخصص تكنولوجيا المركبات) جدول المواصفات — التنقل الكهربي", G12_VT_SPEC),
      f("(تخصص تكنولوجيا المركبات) جدول المواصفات — تشغيل أنظمة الإشعال الإلكترونية في المركبات واختبارها", G12_VT_SPEC),
    ],
    books: [
      f("(تخصص تكنولوجيا المركبات) كتاب التنقل الكهربي", "https://drive.google.com/file/d/1GiQQ8DtEpcJg02BjcFIrimkjxYJU7kPf/view"),
      f("(تخصص تكنولوجيا المركبات) كتاب تشغيل أنظمة الإشعال الإلكترونية في المركبات واختبارها", "https://drive.google.com/file/d/1kor1zJvGk1QXV_OkxdEgGZ-srBeS5zuH/view"),
    ],
    explanations: [
      f("شرح + سلايدات — التنقل الكهربي (تكنولوجيا المركبات)", "https://docs.google.com/presentation/d/1De6vpyGSa0PvpIqoPDePOVzG6pqV740P/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
      f("شرح + سلايدات — تشغيل أنظمة الإشعال الإلكترونية (تكنولوجيا المركبات)", "https://docs.google.com/presentation/d/18Hw_y3mxKBm0xCDWOWmyM29sC1cLLjJR/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
    ],
    assignments: [
      f("مهمة التنقل الكهربي (تكنولوجيا المركبات)", "https://docs.google.com/document/d/1Rlfe96SA7dlTVXDqIHEnizgnRcgPbmDx/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("مهمة تشغيل أنظمة الإشعال الإلكترونية في المركبات واختبارها (تكنولوجيا المركبات)", "https://docs.google.com/document/d/1nybR9DgqBxCrNzVAHUJcOTT7BM0JXqg-/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
    teacherGuide: [
      f("دليل المعلم — التنقل الكهربي (تكنولوجيا المركبات)", "https://docs.google.com/document/d/175I68sFMJLhSkJqH3DYGXJ_1UZtRYixq/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("دليل المعلم — تشغيل أنظمة الإشعال الإلكترونية في المركبات واختبارها (تكنولوجيا المركبات)", "https://docs.google.com/document/d/14HRpAxw_r49UY7mbfikUwN3LL7hNG0lV/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
  }),
  semester3: S({
    specs: [
      f("(تخصص تكنولوجيا المركبات) جدول المواصفات — أنظمة التعليق والتوجيه والكبح في المركبات الخفيفة", G12_VT_SPEC),
      f("(تخصص تكنولوجيا المركبات) جدول المواصفات — تشغيل أنظمة نقل الحركة في المركبات الخفيفة وصيانتها", G12_VT_SPEC),
    ],
    books: [
      f("(تخصص تكنولوجيا المركبات) كتاب أنظمة التعليق والتوجيه والكبح في المركبات الخفيفة", "https://drive.google.com/file/d/1GCVYH609lXukYZvh4e8TcQ4-ITrA2Ot9/view"),
      f("(تخصص تكنولوجيا المركبات) كتاب تشغيل أنظمة نقل الحركة في المركبات الخفيفة وصيانتها", "https://drive.google.com/file/d/12YQiwM56IYxS5216TJdFrPBug0dZ88K3/view"),
    ],
    explanations: [
      f("شرح + سلايدات — أنظمة التعليق والتوجيه والكبح (تكنولوجيا المركبات)", "https://docs.google.com/presentation/d/1UottC78VmzhOGUFe2-T8t2X_vx-RPUld/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
      f("شرح + سلايدات — تشغيل أنظمة نقل الحركة وصيانتها (تكنولوجيا المركبات)", "https://docs.google.com/presentation/d/1sYBsEbt8gQK9DHybiQXMdvSY4UEe2dhF/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "presentation"),
    ],
    assignments: [
      f("مهمة أنظمة التعليق والتوجيه والكبح في المركبات الخفيفة (تكنولوجيا المركبات)", "https://docs.google.com/document/d/1La35ace_0kYOThxWea7Yz5G40BJnstwz/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("مهمة تشغيل أنظمة نقل الحركة في المركبات الخفيفة وصيانتها (تكنولوجيا المركبات)", "https://docs.google.com/document/d/1ThSzFCwP8Gwkn-mbg21FGYrFkFnwN1gY/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
    teacherGuide: [
      f("دليل المعلم — أنظمة التعليق والتوجيه والكبح في المركبات الخفيفة (تكنولوجيا المركبات)", "https://docs.google.com/document/d/1SLptzxEQ1JJRxFwY8eAPT67vdVFE-udA/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
      f("دليل المعلم — تشغيل أنظمة نقل الحركة في المركبات الخفيفة وصيانتها (تكنولوجيا المركبات)", "https://docs.google.com/document/d/1QtcDDYET1GRO0EyfTa67wQpZdXkGEnyJ/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", "doc"),
    ],
  }),
};

export const ENGINEERING_RESOURCES = {
  grade10,
  grade11,
  grade12: emptyG12,
  grade12ByTrack: {
    electrical: grade12Electrical,
    mechanics: grade12Mechanics,
    vehicle: grade12Vehicle,
  },
};

export const ENGINEERING_TRACK_LABELS: Record<string, string> = {
  electrical: "تخصص الكهرباء",
  mechanics: "تخصص الميكانيك",
  vehicle: "تخصص تكنولوجيا المركبات",
};
