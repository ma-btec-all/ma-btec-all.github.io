import { ENGINEERING_RESOURCES } from "./engineeringResources";
import { HEALTHCARE_RESOURCES } from "./healthcareResources";
import { SPORTS_RESOURCES } from "./sportsResources";
import { BEAUTY_RESOURCES } from "./beautyResources";

export interface ResourceFile {
  name: string;
  url: string;
  type: "pdf" | "doc" | "presentation" | "folder";
}

export interface CategoryData {
  files: ResourceFile[];
}

export interface SemesterData {
  books: CategoryData;
  specs: CategoryData;
  explanations: CategoryData;
  teacherGuide: CategoryData;
  assignments: CategoryData;
}

export interface GradeData {
  semester1: SemesterData;
  semester2: SemesterData;
  semester3: SemesterData;
}

export interface DepartmentResources {
  grade10: GradeData;
  grade11: GradeData;
  grade12: GradeData;
  /** مسارات فرعية (مثل هندسة الصف الثاني ثانوي: كهرباء / ميكانيك / تكنولوجيا المركبات) */
  grade12ByTrack?: Record<string, GradeData>;
}

const emptySemester: SemesterData = {
  books: { files: [] },
  specs: { files: [] },
  explanations: { files: [] },
  teacherGuide: { files: [] },
  assignments: { files: [] },
};

const emptyGrade: GradeData = {
  semester1: { ...emptySemester, books: { files: [] }, specs: { files: [] }, explanations: { files: [] }, teacherGuide: { files: [] }, assignments: { files: [] } },
  semester2: { ...emptySemester, books: { files: [] }, specs: { files: [] }, explanations: { files: [] }, teacherGuide: { files: [] }, assignments: { files: [] } },
  semester3: { ...emptySemester, books: { files: [] }, specs: { files: [] }, explanations: { files: [] }, teacherGuide: { files: [] }, assignments: { files: [] } },
};

const emptyDepartment: DepartmentResources = {
  grade10: JSON.parse(JSON.stringify(emptyGrade)),
  grade11: JSON.parse(JSON.stringify(emptyGrade)),
  grade12: JSON.parse(JSON.stringify(emptyGrade)),
};

export const resourcesData: Record<string, DepartmentResources> = {
  it: {
    grade10: {
      semester1: {
        books: { files: [
          { name: "كتاب استخدام تكنولوجيا المعلومات لدعم المعلومات في المنظمات", url: "https://drive.google.com/file/d/1ErBf6MvfhxbrUEtHcX1CQQbyBpYbVbws/view", type: "pdf" },
          { name: "كتاب نمذجة البيانات وجداول البيانات", url: "https://drive.google.com/file/d/1E9JXb7i1-FzR3Olg_w4SPZp5PiCZoXX-/view", type: "pdf" },
        ]},
        specs: { files: [
          { name: "جدول المواصفات استخدام تكنولوجيا المعلومات", url: "https://drive.google.com/file/d/1ZIz9O-d-iJSLo18oMiaygl5uQkIPLer5/view", type: "pdf" },
          { name: "جدول مواصفات نمذجة البيانات وجداول البيانات", url: "https://drive.google.com/file/d/19_ZxHbbKu5FcPgVHJJ4CMQnAiQCuuNgT/view", type: "pdf" },
        ]},
        explanations: { files: [
          { name: "طريقة عمل قاعدة بيانات SQL", url: "https://docs.google.com/presentation/d/1isOcVODToZv8r1a6paWgZPhH6SBpm0rL/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "presentation" },
          { name: "قالب حل + شرح مهمة استخدام تكنولوجيا المعلومات (أ + ب + ج)", url: "https://drive.google.com/file/d/1vcdz-gQXBncdUqGuZclWeNKWr0YYQdVY/view", type: "pdf" },
          { name: "قالب حل + شرح مهمة نمذجة البيانات وجداول البيانات (أ + ب + ج)", url: "https://drive.google.com/file/d/1eug7oamdLQjU1-RVRwe_cIVbe8aMRzmR/view", type: "pdf" },
        ]},
        teacherGuide: { files: [
          { name: "دليل المعلم استخدام تكنولوجيا المعلومات لدعم المعلومات في المنظمات", url: "https://drive.google.com/file/d/1FFAEfMxDRlTCmY88f69cnzKW3S311G3P/view", type: "pdf" },
          { name: "دليل المعلم نمذجة البيانات وجداول البيانات", url: "https://drive.google.com/file/d/1Xes-6O78SbTxUyRIEA4575TEuu374jLd/view", type: "pdf" },
        ]},
        assignments: { files: [
          { name: "طريقة حل مهمة قواعد البيانات SQL", url: "https://docs.google.com/document/d/11-0-IXsWzd3A_fUyVmldFMdGMjsRsIJn/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          { name: "مهمة استخدام تكنولوجيا المعلومات لدعم المعلومات في المنظمات", url: "https://drive.google.com/file/d/1JgEbrOEpA1qN5QPtv3HZ-BZ8P69kOgmP/view", type: "pdf" },
          { name: "مهمة نمذجة البيانات وجداول البيانات", url: "https://drive.google.com/file/d/1LWvTiln9BhtWLeWOeddk0x2re27jUJna/view", type: "pdf" },
        ]},
      },
      semester2: {
        books: { files: [
          { name: "كتاب مقدمة إلى شبكات الكمبيوتر", url: "https://drive.google.com/file/d/1b377tsMPMdLcxc9PpEgzlgIQ49iHLJt9/view", type: "pdf" },
          { name: "كتاب مقدمة في البرمجة", url: "https://drive.google.com/file/d/1SoBXqpMh75HOA3ly_YwVmcCreDsIWLKd/view", type: "pdf" },
          { name: "كتاب مقدمة للرسومات الرقمية والرسوم المتحركة", url: "https://drive.google.com/file/d/1gGyEgJGBY6d__D07gYB_qoWlW29pzZwj/view", type: "pdf" },
        ]},
        specs: { files: [
          { name: "جدول المواصفات مقدمة إلى شبكات الكمبيوتر", url: "https://drive.google.com/file/d/19hpTbSSwTC5JQZ_ivr-73NMKDg6eLx5n/view", type: "pdf" },
          { name: "جدول المواصفات مقدمة في البرمجة", url: "https://drive.google.com/file/d/1vdZ1TzME0CQ2Miz1DQ6UYW_z-XBBzx1G/view", type: "pdf" },
          { name: "جدول المواصفات مقدمة للرسومات الرقمية والرسوم المتحركة", url: "https://drive.google.com/file/d/1qfO2D_grBFfCgVyypb6n2u5Qdvn7J-1-/view", type: "pdf" },
        ]},
        explanations: { files: [
          { name: "قالب حل + شرح مهمة مقدمة إلى شبكات الكمبيوتر (أ)", url: "https://drive.google.com/file/d/1jqZlHK2_ZC7P2IboArldk97W6X8DJam2/view", type: "pdf" },
          { name: "قالب حل + شرح مهمة مقدمة إلى شبكات الكمبيوتر (ب + ج)", url: "https://drive.google.com/file/d/1FVPVUpij2W6dMEK0mMOdunEV3ZTkYL35/view", type: "pdf" },
          { name: "قالب حل + شرح مهمة مقدمة في البرمجة (أ)", url: "https://drive.google.com/file/d/1ytDByc6TTWbgzQTz8tVE-8QC9_80DYSr/view", type: "pdf" },
          { name: "قالب حل + شرح مهمة مقدمة في البرمجة (ب + ج)", url: "https://drive.google.com/file/d/1k1RHksJwtWsc7fPWlIUNqz55CfqkSMbJ/view", type: "pdf" },
          { name: "قالب حل + شرح مهمة مقدمة للرسومات الرقمية والرسوم المتحركة (أ)", url: "https://drive.google.com/drive/folders/1OWoGqMoI-8ODuawBW8ErfVBn7BUgoaIb", type: "folder" },
          { name: "قالب حل + شرح مهمة مقدمة للرسومات الرقمية والرسوم المتحركة (ب + ج)", url: "https://drive.google.com/drive/folders/1VXxJLlzpINzdNlR2pfRr02bEybPT-oAW", type: "folder" },
        ]},
        teacherGuide: { files: [
          { name: "دليل المعلم مقدمة إلى شبكات الكمبيوتر (أ)", url: "https://drive.google.com/file/d/17M6h_QQ9x7ZVM8y_J1jgvgcr4bmQHk0u/view", type: "pdf" },
          { name: "دليل المعلم مقدمة في البرمجة (أ)", url: "https://drive.google.com/file/d/1gyu9giZzlI3UB7X6_omAsjkCF9zhZTvx/view", type: "pdf" },
          { name: "دليل المعلم مقدمة في البرمجة (ب + ج)", url: "https://drive.google.com/file/d/1gyu9giZzlI3UB7X6_omAsjkCF9zhZTvx/view", type: "pdf" },
          { name: "دليل المعلم مقدمة للرسومات الرقمية والرسوم المتحركة (أ)", url: "https://drive.google.com/file/d/10sy0DnYfT51cufTI71cty_fGMiQ4XRYv/view", type: "pdf" },
          { name: "دليل المعلم مقدمة للرسومات الرقمية والرسوم المتحركة (ب + ج)", url: "https://drive.google.com/file/d/1uhRIC1sbeg1Oo_11i2p04Wpo3t3MDzEM/view", type: "pdf" },
        ]},
        assignments: { files: [
          { name: "مهمة مقدمة إلى شبكات الكمبيوتر (أ)", url: "https://docs.google.com/document/d/12zsMbKF2xIH4oIDfhn8a4gqGZQeJrHUu/edit?rtpof=true&tab=t.0", type: "doc" },
          { name: "مهمة مقدمة إلى شبكات الكمبيوتر (ب + ج)", url: "https://docs.google.com/document/d/1Ea9G1jt4xGPHyO_MMKBIqfKlpAYcKnAt/edit?usp=sharing&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          { name: "مهمة مقدمة في البرمجة (أ)", url: "https://docs.google.com/document/d/12zsMbKF2xIH4oIDfhn8a4gqGZQeJrHUu/edit?rtpof=true&tab=t.0", type: "doc" },
          { name: "مهمة مقدمة في البرمجة (ب + ج)", url: "https://drive.google.com/file/d/1n7r0LZ9lCZ9Xk5Bh_Tv5-vEK5wcewo2d/view?usp=drive_link", type: "pdf" },
          { name: "مهمة مقدمة للرسومات الرقمية والرسوم المتحركة (أ)", url: "https://docs.google.com/document/d/18jLiNXcHNWjSIYOq4jpl591pmhhQvm2A/edit?usp=sharing&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          { name: "مهمة مقدمة للرسومات الرقمية والرسوم المتحركة (ب + ج)", url: "https://docs.google.com/document/d/1J0LfVSy5h9cORHgd6KfRlW-7fSr1Raa3/edit?rtpof=true&sd=true&tab=t.0", type: "doc" },
        ]},
      },
      semester3: {
        books: { files: [
          { name: "كتاب مقدمة لتطوير مواقع الويب", url: "https://drive.google.com/file/d/1a8BbOrkWduOnYOFBZ0ehu7rBUU0x5Ef7/view", type: "pdf" },
          { name: "كتاب مقدمة في التطبيقات", url: "https://drive.google.com/file/d/1qroSN3PvhrpGhEM7AKifciTeEws3MOKm/view", type: "pdf" },
          { name: "كتاب مقدمة في تصميم الألعاب", url: "https://drive.google.com/file/d/1-1Qf8_kiTAwvA06U4OfE_Ni3UjICa0yz/view", type: "pdf" },
        ]},
        specs: { files: [
          { name: "جدول المواصفات مقدمة لتطوير مواقع الويب", url: "https://drive.google.com/file/d/14i59gSJjbHhpWIoCXdAvKhsGiVnBRaTX/view", type: "pdf" },
          { name: "جدول المواصفات مقدمة في التطبيقات", url: "https://drive.google.com/file/d/1-HKuHWZagWsIsP9Pd0xjcGdMydoJgzwk/view", type: "pdf" },
          { name: "جدول المواصفات مقدمة في تصميم الألعاب", url: "https://drive.google.com/file/d/1C8mG-b5xwau_nyBIqh10pyOdf9umuBO7/view", type: "pdf" },
        ]},
        explanations: { files: [
          { name: "طريقة حل مهمة مقدمة لتطوير مواقع الويب هدف (أ)", url: "https://drive.google.com/file/d/1ch2z4euuUK8E6g-vWpc0QylL-HPeK_e4/view?usp=sharing", type: "pdf" },
          { name: "طريقة حل مهمة مقدمة في التطبيقات هدف (أ)", url: "https://drive.google.com/file/d/1d-iEP1yNMIl8fpNzWuHPUWs2qWfYTIKm/view?usp=sharing", type: "pdf" },
          { name: "طريقة حل مهمة مقدمة في تصميم الألعاب هدف (أ)", url: "https://drive.google.com/file/d/1zXgUf8-PrY031Uz5_VsT0a_rYk-dd0gv/view?usp=sharing", type: "pdf" },
          { name: "جميع المساعدات لمهمة مقدمة في تصميم الألعاب هدف (ب + ج)", url: "https://drive.google.com/file/d/1LdBmPMqpE9QNpDk49S6Yp7umSY9SbGYX/view?usp=sharing", type: "pdf" },
          { name: "طريقة حل مهمة مقدمة في التطبيقات هدف (ب + ج)", url: "https://drive.google.com/file/d/1ZZ2NxfSKTsQ-SBFd-3JS_da2ZKC_IQcy/view?usp=sharing", type: "pdf" },
          { name: "طريقة حل مهمة مقدمة لتطوير مواقع الويب هدف (ب+ج)", url: "https://drive.google.com/file/d/1lC7cn0KnZCXnpFXNNSF1RMOe2KRasomr/view?usp=drive_link", type: "pdf" },
        ]},
        teacherGuide: { files: [
          { name: "دليل المعلم مقدمة لتطوير مواقع الويب هدف (أ)", url: "https://drive.google.com/file/d/1RNvlIomcurgrjj6ODIo8-eqEmXmVo2MA/view?usp=drive_link", type: "pdf" },
          { name: "دليل المعلم مقدمة لتطوير مواقع الويب هدف (ب + ج)", url: "https://drive.google.com/file/d/1RNvlIomcurgrjj6ODIo8-eqEmXmVo2MA/view", type: "pdf" },
          { name: "دليل المعلم مقدمة في التطبيقات هدف (أ)", url: "https://drive.google.com/file/d/1s_kja5xfmuuxdUKrWXL_OdwjoOlfyYcb/view", type: "pdf" },
          { name: "دليل المعلم مقدمة في التطبيقات هدف (ب + ج)", url: "https://drive.google.com/file/d/1s_kja5xfmuuxdUKrWXL_OdwjoOlfyYcb/view", type: "pdf" },
          { name: "دليل المعلم مقدمة في تصميم الألعاب هدف (أ)", url: "https://drive.google.com/file/d/1Fc0-QlxhBYFcCW6k1PbLBm_OKFBBx-Mz/view", type: "pdf" },
          { name: "دليل المعلم مقدمة في تصميم الألعاب هدف (ب + ج)", url: "https://drive.google.com/file/d/1JLcHs6RS2m9_b3tM6fmMGBqn-PIzdmux/view", type: "pdf" },
        ]},
        assignments: { files: [
          { name: "مهمة متقدمة لتطوير مواقع الويب للصف العاشر (أ)", url: "https://docs.google.com/document/d/1XsjyStMAoSu16KcEWRTDjP5wz6rANnzh/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          { name: "مهمة مقدمة في التطبيقات هدف (أ)", url: "https://docs.google.com/document/d/1NQNDSk4ymoXZMx2zrLobbkhyUSz6iRsV/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          { name: "مهمة مقدمة في تصميم الألعاب هدف (أ)", url: "https://docs.google.com/document/d/18O51wu2v2GQuJOFcLoSlVIMrD6bKu9sI/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          { name: "مهمة مقدمة في تصميم الألعاب هدف (ب+ج) للصف العاشر", url: "https://docs.google.com/document/d/19P8U4fzRtlone2XnqA-UNJKhZAH3yeeR/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          { name: "مهمة متقدمة لتطوير مواقع الويب للصف العاشر (ب + ج)", url: "https://docs.google.com/document/d/1eW5X1xT7mdP0XR6n003Xi4nzERD1Obgn/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          { name: "مهمة مقدمة في التطبيقات هدف (ب + ج)", url: "https://docs.google.com/document/d/10cDjctYlJ3TKFYUgWWE0kEBiOWk9HgKB/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
        ]},
      },
    },
    grade11: {
      semester1: {
        books: { files: [
          { name: "كتاب أنظمة تكنولوجيا المعلومات الإستراتيجية", url: "https://drive.google.com/file/d/1UPJppeWWj2WufCxTTIbQC11f3mJSGs06/view", type: "pdf" },
        ]},
        specs: { files: [
          { name: "جدول المواصفات أنظمة تكنولوجيا المعلومات الإستراتيجية", url: "https://drive.google.com/file/d/11BndZRSETRpxxGSKdBCrRr1pWZIcAKbH/view", type: "pdf" },
        ]},
        explanations: { files: [
          { name: "طريقة حل + شرح مهمة أنظمة تكنولوجيا المعلومات الإستراتيجية هدف (أ + ب + ج + د)", url: "https://docs.google.com/presentation/d/1tduonGYX1JBQikMRVcVNEohlRVtbLMug/edit", type: "presentation" },
        ]},
        teacherGuide: { files: [
          { name: "دليل المعلم أنظمة تكنولوجيا المعلومات الإستراتيجية", url: "https://drive.google.com/file/d/1Frk2gf5J2OKagu4bVd1QXNIq5ZcOhIbR/view", type: "pdf" },
        ]},
        assignments: { files: [
          { name: "مهمة أنظمة تكنولوجيا المعلومات الإستراتيجية هدف (أ + ب + ج + د)", url: "https://drive.google.com/file/d/1zkNE88w3YcSvMEufYJexXYohPWdSJK5T/view", type: "pdf" },
        ]},
      },
      semester2: {
        books: { files: [
          { name: "كتاب تطوير المواقع الإلكترونية", url: "https://drive.google.com/file/d/1EyrYXuCUbPbdrxW2PJm7hmwLlz_x3HMx/view", type: "pdf" },
          { name: "كتاب تطوير تطبيقات الهاتف المحمول", url: "https://drive.google.com/file/d/1Id-JkPe3kQtICu6N8XTysx3ID7ZRCyzj/view", type: "pdf" },
        ]},
        specs: { files: [
          { name: "جدول مواصفات تطوير المواقع الإلكترونية", url: "https://drive.google.com/file/d/1pUVG9wPn8_C9t_gW4gp3v9lrz5a5pb7u/view", type: "pdf" },
          { name: "جدول المواصفات تطوير تطبيقات الهاتف المحمول", url: "https://drive.google.com/file/d/17WCyxfUa9AV3470o_avYLs0JsPN0FOk5/view", type: "pdf" },
        ]},
        explanations: { files: [
          { name: "طريقة حل + شرح مهمة تطوير المواقع الإلكترونية (أ)", url: "https://drive.google.com/file/d/1ch2z4euuUK8E6g-vWpc0QylL-HPeK_e4/view?usp=sharing", type: "pdf" },
          { name: "طريقة حل + شرح مهمة تطوير المواقع الإلكترونية (ب + ج)", url: "https://drive.google.com/file/d/1hR09MfOP4HCF4K7Dp1mPTqQnrze2rtOI/view", type: "pdf" },
          { name: "قالب حل + شرح مهمة تطوير تطبيقات الهاتف المحمول (أ)", url: "https://drive.google.com/file/d/1hvzQrLBxVIZokqCZ2HVBNRIlXqHoqiG6/view?usp=sharing", type: "pdf" },
          { name: "قالب حل + شرح مهمة تطوير تطبيقات الهاتف المحمول (ب + ج)", url: "https://drive.google.com/drive/folders/1-UJOOsFHIPfQoqeuIXSPQ0JacNNIT6Ud", type: "folder" },
        ]},
        teacherGuide: { files: [
          { name: "دليل المعلم تطوير المواقع الإلكترونية", url: "https://drive.google.com/file/d/18LJcRFEd3wEa88drI2uCW9epAxmmTxti/view", type: "pdf" },
          { name: "دليل المعلم تطوير تطبيقات الهاتف المحمول (أ)", url: "https://drive.google.com/file/d/1fjem3VFj9UzB3JvFAbWsVEC4OQeCXxM9/view", type: "pdf" },
          { name: "دليل المعلم تطوير تطبيقات الهاتف المحمول (ب + ج)", url: "https://drive.google.com/file/d/1tNf0jLFFRArgw968_KPhcVFfQSP7jN2M/view", type: "pdf" },
        ]},
        assignments: { files: [
          { name: "مهمة تطوير المواقع الاكترونية هدف (أ)", url: "https://drive.google.com/file/d/1emoaG5oLxVrjEcFqIN0j1Duwlt5G3_17/view?usp=drive_link", type: "pdf" },
          { name: "مهمة تطوير تطبيقات الهاتف المحمول (أ)", url: "https://docs.google.com/document/d/1MaCLiU0R3gQFYDlBitIDqdN33C2uHgFt/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          { name: "مهمة تطوير تطبيقات الهاتف المحمول (ب + ج)", url: "https://docs.google.com/document/d/1IKu3fyzl-BiAbmxz1PYXVbCe-pKr75bX/edit#bookmark=id.gjdgxs", type: "doc" },
          { name: "مهمة تطوير المواقع الاكترونية هدف (ب + ج)", url: "https://drive.google.com/file/d/1QqCQuZBKjC7o2pnYWpuS5hq2aJoeHDDp/view?usp=drive_link", type: "pdf" },
        ]},
      },
      semester3: {
        books: { files: [
          { name: "كتاب الدعم الفني وإدارة تكنولوجيا المعلومات", url: "https://drive.google.com/file/d/1gouF628abMFsE1hUZhk2crVC-vpSfD0m/view", type: "pdf" },
          { name: "كتاب تطوير ألعاب الحاسوب", url: "https://drive.google.com/file/d/19ndas08iwr_tH0OB-qRtoBnnBUN5NEqN/view", type: "pdf" },
        ]},
        specs: { files: [
          { name: "جدول المواصفات الدعم الفني وإدارة تكنولوجيا المعلومات", url: "https://drive.google.com/file/d/1-QKr5Dvw4D8gBtt8hMNKoV9O-JiDrGuo/view", type: "pdf" },
          { name: "جدول مواصفات تطوير ألعاب الحاسوب", url: "https://drive.google.com/file/d/1gaVGCXOgI2-Mf8cHDcHp29m0juIR3zJh/view", type: "pdf" },
        ]},
        explanations: { files: [
          { name: "طريقة حل مهمة الدعم الفني وإدارة تكنولوجيا المعلومات (أ)", url: "https://drive.google.com/file/d/1tUM4Gzl2p6IHKLTklHzG8RkPrHpFXHzo/view", type: "pdf" },
          { name: "طريقة حل مهمة تطوير ألعاب الحاسوب هدف (أ)", url: "https://drive.google.com/file/d/1hEC4aEjM1qbjwLdspcnaRU7JtpILhPi9/view", type: "pdf" },
          { name: "طريقة حل مهمة تطوير ألعاب الحاسوب هدف (ب + ج)", url: "https://drive.google.com/file/d/1dvPWZhWHoGQwnTRMLgaBHwURiyh2O8Zk/view?usp=sharing", type: "pdf" },
          { name: "جميع المساعدات لمهمة الدعم الفني وإدارة تكنولوجيا المعلومات هدف (ب)", url: "https://drive.google.com/drive/folders/1cCV0YHFjti6LN5VAsokacbSEWVUyrJHc?usp=drive_link", type: "folder" },
          { name: "طريقة حل مهمة الدعم الفني وإدارة تكنولوجيا المعلومات هدف (ج)", url: "https://drive.google.com/file/d/1VBiPY4E9L3g4a5nrD-IgZlphUzbjUahg/view?usp=sharing", type: "pdf" },
        ]},
        teacherGuide: { files: [
          { name: "دليل المعلم الدعم الفني وإدارة تكنولوجيا المعلومات هدف (أ)", url: "https://drive.google.com/file/d/1Frk2gf5J2OKagu4bVd1QXNIq5ZcOhIbR/view", type: "pdf" },
          { name: "دليل المعلم تطوير ألعاب الحاسوب هدف (أ)", url: "https://drive.google.com/file/d/1XEhzOE0kyQLyi6MQftn195GsNWLljPcW/view", type: "pdf" },
        ]},
        assignments: { files: [
          { name: "مهمة تطوير ألعاب الحاسوب هدف هدف (أ)", url: "https://docs.google.com/document/d/12ujVEHy0kwsIDwVocg1lhjyPgkwM84Wb/edit?usp=drive_web&ouid=111743495162828167240&rtpof=true", type: "doc" },
          { name: "مهمة الدعم الفني وإدارة تكنولوجيا المعلومات هدف (أ)", url: "https://docs.google.com/document/d/1mb2aMhYVZ_wNyngUA00jgrietrjJ1Ybh/edit#bookmark=id.gjdgxs", type: "doc" },
          { name: "مهمة الدعم الفني وإدارة تكنولوجيا المعلومات هدف (ب)", url: "https://docs.google.com/document/d/1LWooYmix6kgBBL0kKoSQweXJtFdoj5A7/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          { name: "مهمة الدعم الفني وإدارة تكنولوجيا المعلومات هدف (ج)", url: "https://docs.google.com/document/d/1JggxUbO-dwtt7UPPSy0ZX11gT2ckcXJl/edit?rtpof=true&tab=t.0", type: "doc" },
          { name: "مهمة تطوير ألعاب الحاسوب هدف (ب + ج)", url: "https://docs.google.com/document/d/1Zi6lJVKxes92IaLT_aWBAHI7zHorNMso/edit#bookmark=id.gjdgxs", type: "doc" },
        ]},
      },
    },
    grade12: {
      semester1: {
        books: { files: [
          { name: "كتاب الأمن السيبراني وإدارة الحوادث", url: "https://drive.google.com/file/d/1BB96PD8E3wiBFUoApSRGrPSCZy-xPXjN/view", type: "pdf" },
          { name: "كتاب مقدمة إلى الذكاء االصطناعي AI", url: "https://drive.google.com/file/d/1oCJDi001fvr2anddZrQMHpr7EvST15yq/view", type: "pdf" },
        ]},
        specs: { files: [
          { name: "جدول المواصفات الأمن السيبراني وإدارة الحوادث", url: "https://drive.google.com/file/d/1xoRstZtFO51Onm15Lty-3OCZm-azeTbO/view", type: "pdf" },
          { name: "جدول المواصفات مقدمة إلى الذكاء االصطناعي AI", url: "https://drive.google.com/file/d/1GVfAKM4oqW7rS2P5LiYhy6n9XSG_dj6y/view", type: "pdf" },
        ]},
        explanations: { files: [
          { name: "جميع المساعدات لمهمة الأمن السيبراني وإدارة الحوادث (أ + ب + ج + د)", url: "https://drive.google.com/drive/folders/1veRGidpd_BhVDzL1wEJuB2-vGFKle_Hg?usp=sharing", type: "folder" },
          { name: "جميع المساعدات لمهمة مقدمة إلى الذكاء االصطناعي AI (أ)", url: "https://drive.google.com/drive/folders/1QMejjbUQUMTCTvmke2DS-o0LR8HppbhP?usp=drive_link", type: "folder" },
        ]},
        teacherGuide: { files: [] },
        assignments: { files: [
          { name: "مهمة الأمن السيبراني وإدارة الحوادث (أ)", url: "https://drive.google.com/file/d/1pTz9W-HPweiDFT0weXJWLwI56tYL6Qzr/view", type: "pdf" },
          { name: "مهمة مقدمة إلى الذكاء االصطناعي AI هدف (أ)", url: "https://docs.google.com/document/d/11RYM9diz4jHgg6lSermURDGGy2KpzmJ-/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
        ]},
      },
      semester2: {
        books: { files: [
          { name: "كتاب البرمجة", url: "https://drive.google.com/file/d/1cCa1-w7qlmQPyyrQYITsKf-noALwBqlp/view", type: "pdf" },
          { name: "كتاب مقدمة إلى الذكاء االصطناعي AI", url: "https://drive.google.com/file/d/1oCJDi001fvr2anddZrQMHpr7EvST15yq/view", type: "pdf" },
          { name: "كتاب كتاب إدارة مشاريع تكنولوجيا المعلومات", url: "https://drive.google.com/file/d/18k5AWatEt5pp9kTKjHgdWpat5WjqMGvY/view", type: "pdf" },
        ]},
        specs: { files: [
          { name: "جدول مواصفات البرمجة", url: "https://drive.google.com/file/d/1x7pxRhyBmdX01ohmT_g9_78X8djFSScc/view?usp=drive_link", type: "pdf" },
          { name: "جدول المواصفات مقدمة إلى الذكاء االصطناعي AI", url: "https://drive.google.com/file/d/1SOStNLwCRGTqPegJqWxoWubIDnsTJ4G_/view?usp=sharing", type: "pdf" },
          { name: "جدول المواصفات إدارة مشاريع تكنولوجيا المعلومات", url: "https://drive.google.com/file/d/1SZB6UHBzNKQNuwggYKtsZclhuh7QBKse/view", type: "pdf" },
        ]},
        explanations: { files: [
          { name: "طريقة حل مهمة البرمجة هدف (أ)", url: "https://drive.google.com/file/d/1xoqSYyuAidTIphROUxefadQBuVyasc61/view", type: "pdf" },
          { name: "طريقة حل مهمة البرمجة هدف (ب+ج)", url: "https://drive.google.com/file/d/1go3pApjgsabQc5D7vUXS168DNO5imvDO/view?usp=drive_link", type: "pdf" },
          { name: "جميع المساعدات لمهمة مقدمة إلى الذكاء االصطناعي AI هدف (ب + ج)", url: "https://drive.google.com/drive/folders/1C6pM_VEYllvg793ADdXb1HuCWg1udYFV", type: "folder" },
          { name: "طريقة حل + شرح مهمة مهمة إدارة مشاريع تكنولوجيا المعلومات (أ)", url: "https://drive.google.com/file/d/1fWTdNN4poG9tilhWKh5PQkFCNjxlO1P8/view", type: "pdf" },
          { name: "طريقة حل مهمة إدارة مشاريع تكنولوجيا المعلومات هدف (أ)", url: "https://drive.google.com/file/d/14wCtEqsL5Jdf7xYlXvTEPHcLsL_a3duQ/view?usp=drivesdk", type: "pdf" },
        ]},
        teacherGuide: { files: [] },
        assignments: { files: [
          { name: "مهمة البرمجة هدف (أ)", url: "https://docs.google.com/document/d/11dLb8j0REe9IqOG7zKSsPJYR3ZtWnDpo/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          { name: "مهمة البرمجة هدف (ب+ج)", url: "https://docs.google.com/document/d/1rWQu9t3C9TCo0V-3KPlLYTGJSDLgAtsh/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          { name: "مهمة مقدمة إلى الذكاء االصطناعي AI هدف (ب + ج)", url: "https://docs.google.com/document/d/1CIMZOS9L_D7QS5IZAx5Tks4KLbayzq2H/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          { name: "مهمة إدارة مشاريع تكنولوجيا المعلومات هدف (أ)", url: "https://docs.google.com/document/d/1Z9TFhQGyujV2kzRKAonYsAI1c4mbtcnJ/edit?usp=sharing&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
        ]},
      },
      semester3: {
        books: { files: [
          { name: "كتاب كتاب إدارة مشاريع تكنولوجيا المعلومات", url: "https://drive.google.com/file/d/18k5AWatEt5pp9kTKjHgdWpat5WjqMGvY/view", type: "pdf" },
        ]},
        specs: { files: [
          { name: "جدول المواصفات إدارة مشاريع تكنولوجيا المعلومات", url: "https://drive.google.com/file/d/1SZB6UHBzNKQNuwggYKtsZclhuh7QBKse/view", type: "pdf" },
        ]},
        explanations: { files: [
          { name: "طريقة حل مهمة إدارة مشاريع تكنولوجيا المعلومات هدف (ب + ج + د)", url: "https://drive.google.com/file/d/1WHwOfRfAxh07HQUe2gWC-OnUxZoKNdfw/view?usp=sharing", type: "pdf" },
        ]},
        teacherGuide: { files: [] },
        assignments: { files: [
          { name: "مهمة إدارة مشاريع تكنولوجيا المعلومات هدف (ب + ج)", url: "https://docs.google.com/document/d/1kTYkBgC7IiTqbocL-TdHKQ7T0FNIvH9r/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          { name: "مهمة إدارة مشاريع تكنولوجيا المعلومات هدف (د)", url: "https://docs.google.com/document/d/1XhuLr6OQNDQIB3dAFvzfVvaR9k_oQnws/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
        ]},
      },
    },
  },
  agriculture: JSON.parse(JSON.stringify(emptyDepartment)),
  hospitality: {
    grade10: {
      semester1: {
        specs: {
          files: [
            { name: "جدول المواصفات التعريف بقطاع الضيافة", url: "https://drive.google.com/file/d/1UXFWD-cRz9qM4BKL0FS_L7Ecdbb1WHFD/view?usp=drive_lin", type: "pdf" },
            { name: "جدول المواصفات مهارات مكان العمل في مجال الضيافة", url: "https://drive.google.com/file/d/1UXFWD-cRz9qM4BKL0FS_L7Ecdbb1WHFD/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات مهارات خدمة العملاء في قطاع الضيافة", url: "https://drive.google.com/file/d/1UXFWD-cRz9qM4BKL0FS_L7Ecdbb1WHFD/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات الاستدامة في قطاع الضيافة", url: "https://drive.google.com/file/d/1UXFWD-cRz9qM4BKL0FS_L7Ecdbb1WHFD/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات إعداد الطعام وطهيه وتقديمه", url: "https://drive.google.com/file/d/1UXFWD-cRz9qM4BKL0FS_L7Ecdbb1WHFD/view?usp=drive_link", type: "pdf" },
          ],
        },
        books: {
          files: [
            { name: "كتاب التعريف بقطاع الضيافة", url: "https://drive.google.com/file/d/1NRGI6fyZRGTkHdv-LlHJZzGY-015iAn6/view?usp=sharing", type: "pdf" },
            { name: "كتاب مهارات مكان العمل في مجال الضيافة", url: "https://drive.google.com/file/d/1NRGI6fyZRGTkHdv-LlHJZzGY-015iAn6/view?usp=sharing", type: "pdf" },
            { name: "كتاب مهارات خدمة العملاء في قطاع الضيافة", url: "https://drive.google.com/file/d/1NRGI6fyZRGTkHdv-LlHJZzGY-015iAn6/view?usp=sharing", type: "pdf" },
            { name: "كتاب الاستدامة في قطاع الضيافة", url: "https://drive.google.com/file/d/1NRGI6fyZRGTkHdv-LlHJZzGY-015iAn6/view?usp=sharing", type: "pdf" },
            { name: "كتاب إعداد الطعام وطهيه وتقديمه", url: "https://drive.google.com/file/d/1S7OhtOns5p4G7q4YSE0hCz7uClN3AlaX/view?usp=drive_link", type: "pdf" },
          ],
        },
        explanations: {
          files: [
            { name: "شرح + سلايدات التعريف بقطاع الضيافة", url: "https://docs.google.com/presentation/d/19om0oEC0Iwq0oRIvEE6SNdFCxmN2fOU-/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "presentation" },
            { name: "شرح + سلايدات مهارات مكان العمل في مجال الضيافة", url: "https://docs.google.com/presentation/d/13f7dJL-6hvVl5ZlGUoopJFUAXPqYTAkV/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "presentation" },
            { name: "شرح + سلايدات مهارات خدمة العملاء في قطاع الضيافة", url: "https://docs.google.com/presentation/d/1jpScvHlwVe-boI6oYzRlIFDR1hYM10O6/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "presentation" },
            { name: "شرح + سلايدات الاستدامة في قطاع الضيافة", url: "https://docs.google.com/presentation/d/1vEyhVSUQhdj-Idw8aN20I4XFwBWLmzUw/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "presentation" },
            { name: "شرح + سلايدات إعداد الطعام وطهيه وتقديمه", url: "https://docs.google.com/presentation/d/1NOfPwlrmyxQqq_pijYsy0AGh0PclJZeN/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "presentation" },
          ],
        },
        teacherGuide: {
          files: [
            { name: "دليل المعلم التعريف بقطاع الضيافة", url: "https://docs.google.com/document/d/1gt0MjVrLxUnVLFZdM9HQ31FuwSnAWSt3/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "دليل المعلم مهارات مكان العمل في مجال الضيافة", url: "https://docs.google.com/document/d/1t2PONuLoPJnIHMC7gZPdHlAwg2lxkilC/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "دليل المعلم مهارات خدمة العملاء في قطاع الضيافة", url: "https://docs.google.com/document/d/1wncvW0GLKCBC-Fw_hOm-XNCG8g2jDVzU/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "دليل المعلم الاستدامة في قطاع الضيافة", url: "https://docs.google.com/document/d/1JCbV9ujladOS0qp2iLgI1fnrzyKkPOY6/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "دليل المعلم إعداد الطعام وطهيه وتقديمه", url: "https://docs.google.com/document/d/1qpqSavfOhatLkgyaU70ZSfL3JBTXTnxR/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
          ],
        },
        assignments: {
          files: [
            { name: "مهمة التعريف بقطاع الضيافة", url: "https://docs.google.com/document/d/1btHaJcu5zhJ_iZdy08HLgIb1c6g_St61/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "مهمة مهارات مكان العمل في مجال الضيافة", url: "https://docs.google.com/document/d/1hWPbEovU6VBpb-kaJHouCvH0w8yHf_er/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "مهمة مهارات خدمة العملاء في قطاع الضيافة", url: "https://docs.google.com/document/d/1N1BBnww2_ERSPxNfgUeXBXwQP8o52HrZ/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "مهمة الاستدامة في قطاع الضيافة", url: "https://docs.google.com/document/d/12hMgkTX_QCFsquR4SRlcazt8JA8Jq_NS/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "مهمة إعداد الطعام وطهيه وتقديمه", url: "https://docs.google.com/document/d/1GcrUWwScTqQlpimSkhv88YnAuGD1lojx/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
          ],
        },
      },
      semester2: {
        specs: {
          files: [
            { name: "جدول المواصفات الصحة والسلامة والنظافة في مجال الضيافة", url: "https://drive.google.com/file/d/114YssW4UuDE1IptErSUJbT1UZdfGNGbU/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات أنماط الحياة الصحية، والأطعمة، والخيارات في قوائم الطعام", url: "https://drive.google.com/file/d/114YssW4UuDE1IptErSUJbT1UZdfGNGbU/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات تقديم الأطعمة والمشروبات", url: "https://drive.google.com/file/d/114YssW4UuDE1IptErSUJbT1UZdfGNGbU/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات الشراء والرقابة على المخزون", url: "https://drive.google.com/file/d/114YssW4UuDE1IptErSUJbT1UZdfGNGbU/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات المعجنات والحلويات", url: "https://drive.google.com/file/d/114YssW4UuDE1IptErSUJbT1UZdfGNGbU/view?usp=drive_link", type: "pdf" },
          ],
        },
        books: {
          files: [
            { name: "كتاب الصحة والسلامة والنظافة في مجال الضيافة", url: "https://drive.google.com/file/d/1R2hdgf4m6NJJJtOTfhvsKX8-X55JViGz/view?usp=drive_link", type: "pdf" },
            { name: "كتاب أنماط الحياة الصحية، والأطعمة، والخيارات في قوائم الطعام", url: "https://drive.google.com/file/d/1l9r5v94F5Qdp0oUHvs3u0fQPoBwhLbF9/view?usp=drive_link", type: "pdf" },
            { name: "كتاب تقديم الأطعمة والمشروبات", url: "https://drive.google.com/file/d/1H5xsL-BJ3AKhpaItdUjI37Dz8zVJmXhz/view?usp=drive_link", type: "pdf" },
            { name: "كتاب تقديم الشراء والرقابة على المخزون", url: "https://drive.google.com/file/d/1sb2uhcXphB3bINmrNRbhfHrbnt0c7QL9/view?usp=drive_link", type: "pdf" },
            { name: "كتاب المعجنات والحلويات", url: "https://drive.google.com/file/d/1wmWvYzl4x58jdYy187oo3e1CvSBPzxzf/view?usp=drive_link", type: "pdf" },
          ],
        },
        explanations: {
          files: [
            { name: "شرح + سلايدات الصحة والسلامة والنظافة في مجال الضيافة", url: "https://docs.google.com/presentation/d/1tJXCcBUGGgZM_-doE-aff837rLeCX39I/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", type: "presentation" },
            { name: "شرح + سلايدات أنماط الحياة الصحية، والأطعمة، والخيارات في قوائم الطعام", url: "https://docs.google.com/presentation/d/1JSgPLq6eIPRkFROc4iEwBtbeRMG2Id_D/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", type: "presentation" },
            { name: "شرح + سلايدات تقديم الأطعمة والمشروبات", url: "https://docs.google.com/presentation/d/1-cEAufi_g0Mvf8nsitK4nLpHS1KwtSlM/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", type: "presentation" },
            { name: "شرح + سلايدات تقديم الشراء والرقابة على المخزون", url: "https://docs.google.com/presentation/d/1SmtP2wOCSD1WJjmM9aaj_aw_J_OsqmK8/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", type: "presentation" },
            { name: "شرح + سلايدات المعجنات والحلويات", url: "https://docs.google.com/presentation/d/1QOQAg3n-_3x4-8WMJ9Vem8uMmAmMLVFn/edit?usp=sharing&ouid=103331752942697650285&rtpof=true&sd=true", type: "presentation" },
          ],
        },
        teacherGuide: {
          files: [
            { name: "دليل المعلم الصحة والسلامة والنظافة في مجال الضيافة", url: "https://docs.google.com/document/d/1MBLWiOKhwvbuLmseJ0XDQifRJ6mNYOTE/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "دليل المعلم أنماط الحياة الصحية، والأطعمة، والخيارات في قوائم الطعام", url: "https://docs.google.com/document/d/1C27rc8NqtSLrqjWgJ6Putr0pEyw_OxT0/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "دليل المعلم تقديم الأطعمة والمشروبات", url: "https://docs.google.com/document/d/11vSd-RDfaWySjlZom3MwHARbXMRQELII/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "دليل المعلم تقديم الشراء والرقابة على المخزون", url: "https://docs.google.com/document/d/18yi8YPkRgp09H9mrLbHN4g3-6HqsR78U/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "دليل المعلم المعجنات والحلويات", url: "https://docs.google.com/document/d/1w4BBLc9TsweZiYzyEJjVe9smO5f4rF_X/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
          ],
        },
        assignments: {
          files: [
            { name: "مهمة الصحة والسلامة والنظافة في مجال الضيافة", url: "https://docs.google.com/document/d/1l0TvjxUzA3cG4RhH27ld4EOLBEwM52W5/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "مهمة أنماط الحياة الصحية، والأطعمة، والخيارات في قوائم الطعام", url: "https://docs.google.com/document/d/1lYu3hPRT6oICq0DSLnEsR4MBnatZLWDA/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "مهمة تقديم الأطعمة والمشروبات", url: "https://docs.google.com/document/d/1uXL7FshGnaIcx5no9zjZUmpvMlZclMDi/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "مهمة تقديم الشراء والرقابة على المخزون", url: "https://docs.google.com/document/d/1tVR6Ot6fW-RbbllwA8HCHq12SP2tWFfI/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "مهمة المعجنات والحلويات", url: "https://docs.google.com/document/d/1DOwe4RzkPmfb-eAb_-s9wORMlapoOjeR/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
          ],
        },
      },
      semester3: {
        specs: {
          files: [
            { name: "جدول المواصفات تخطيط وإدارة فعالية الضيافة", url: "https://drive.google.com/file/d/1u6lG-o03JQmneO0a8W0wlABYr49hnn2M/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات الطعام العالمي المعاصر", url: "https://drive.google.com/file/d/1u6lG-o03JQmneO0a8W0wlABYr49hnn2M/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات خدمات الإقامة في مجال الضيافة", url: "https://drive.google.com/file/d/1u6lG-o03JQmneO0a8W0wlABYr49hnn2M/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات عمليات المكاتب الأمامية لقطاع الضيافة", url: "https://drive.google.com/file/d/1u6lG-o03JQmneO0a8W0wlABYr49hnn2M/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات مهارات صانع المشروبات", url: "https://drive.google.com/file/d/1u6lG-o03JQmneO0a8W0wlABYr49hnn2M/view?usp=drive_link", type: "pdf" },
          ],
        },
        books: {
          files: [
            { name: "كتاب تخطيط وإدارة فعالية الضيافة", url: "https://drive.google.com/file/d/1FK1VN1zyXv05-xBw484rQi8K0rR6niI9/view?usp=drive_link", type: "pdf" },
            { name: "كتاب الطعام العالمي المعاصر", url: "https://drive.google.com/file/d/1qsM-F-h41QEMVQ4Eu6bH3zH8lNHysv9r/view?usp=drive_link", type: "pdf" },
            { name: "كتاب خدمات الإقامة في مجال الضيافة", url: "https://drive.google.com/file/d/1zlxdpAi9OvACiBVkK8OPfjH8ICIKVoQT/view?usp=drive_link", type: "pdf" },
            { name: "كتاب عمليات المكاتب الأمامية لقطاع الضيافة", url: "https://drive.google.com/file/d/1DFTdUnYLifuJ0T8OAgwaEL_LRSU6mdGy/view?usp=drive_link", type: "pdf" },
            { name: "كتاب مهارات صانع المشروبات", url: "https://drive.google.com/file/d/1S13qlqlF5r2bo50pxcVoVZ2MnyBMHKBw/view?usp=drive_link", type: "pdf" },
          ],
        },
        explanations: {
          files: [
            { name: "شرح + سلايدات تخطيط وإدارة فعالية الضيافة", url: "https://docs.google.com/presentation/d/1jWxWyEe_g-KJLHQvGd-LfAQL7tQ9YfST/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "presentation" },
            { name: "شرح + سلايدات الطعام العالمي المعاصر", url: "https://docs.google.com/presentation/d/1rmOf5UUCP-dEQ7HeO5c1Fm0ZZnC9K1SY/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "presentation" },
            { name: "شرح + سلايدات خدمات الإقامة في مجال الضيافة", url: "https://docs.google.com/presentation/d/1exJWqsBGi4wjnNaBNlbK9VceDNcHGjZc/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "presentation" },
            { name: "شرح + سلايدات عمليات المكاتب الأمامية لقطاع الضيافة", url: "https://docs.google.com/presentation/d/1DHEZBX9yFpQUfq_ParOeivcnsLmTF89g/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "presentation" },
            { name: "شرح + سلايدات مهارات صانع المشروبات", url: "https://docs.google.com/presentation/d/10atej_03J09RPEpXIGikzMZ888s-_zsG/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "presentation" },
          ],
        },
        teacherGuide: {
          files: [
            { name: "دليل المعلم تخطيط وإدارة فعالية الضيافة", url: "https://docs.google.com/document/d/1Rl41gOJ1XhdMeHyLa8HjA9gdkIEs3djR/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "دليل المعلم الطعام العالمي المعاصر", url: "https://docs.google.com/document/d/1n7auKP6_dO0U21Dl-tKrSVnBamsYuGaf/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "دليل المعلم خدمات الإقامة في مجال الضيافة", url: "https://docs.google.com/document/d/1BfFDiXsfgJsyhklqaPZBpO1vDW8y9iT6/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "دليل المعلم عمليات المكاتب الأمامية لقطاع الضيافة", url: "https://docs.google.com/document/d/1jmf6z3S-tLO4mijedqBndHEFNb1Lb1kU/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "دليل المعلم مهارات صانع المشروبات", url: "https://docs.google.com/document/d/1pDtFjuf3QkpENW3DlYvBhz5-Smc5ramC/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
          ],
        },
        assignments: {
          files: [
            { name: "مهمة تخطيط وإدارة فعالية الضيافة", url: "https://docs.google.com/document/d/1hx09T1QGbDaa_255B-ZPSFU8_4BJR5cN/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "مهمة الطعام العالمي المعاصر", url: "https://docs.google.com/document/d/1yX_gzRWRmWawe7iJOCtPMzCRa9A4B2is/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "مهمة خدمات الإقامة في مجال الضيافة", url: "https://docs.google.com/document/d/1pCEMsvmmuTcNhFFjenSoDWJJyKGDVv3-/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "مهمة عمليات المكاتب الأمامية لقطاع الضيافة", url: "https://docs.google.com/document/d/1K-0KCCdG3B6SYhp0kPRu06obaRBKqwV4/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "مهمة مهارات صانع المشروبات", url: "https://docs.google.com/document/d/1GgHoMKbQQ-6bSfE5jSgMNUry0fzHrCPX/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
          ],
        },
      },
    },
    grade11: {
      semester1: {
        specs: {
          files: [
            { name: "جدول المواصفات مجال الضيافة", url: "https://drive.google.com/file/d/126DURF2jDBUvCmfIM7h6_han-2Dp1zdg/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات توفير خدمة العملاء في مجال الضيافة", url: "https://drive.google.com/file/d/1fH9Xwr8sN9ToUjltXEwTWqwA-QiLogwA/view?usp=drive_link", type: "pdf" },
          ],
        },
        books: {
          files: [
            { name: "كتاب مجال الضيافة", url: "https://drive.google.com/file/d/1-O5dwkV6YTN0sktcvZnWIu-t0cAtDU90/view?usp=drive_link", type: "pdf" },
            { name: "كتاب توفير خدمة العملاء في مجال الضيافة", url: "https://drive.google.com/file/d/1qpDftG0teVEsmEAoKuuqRI8fcQUB02ED/view?usp=drive_link", type: "pdf" },
          ],
        },
        explanations: {
          files: [
            { name: "شرح + سلايدات مجال الضيافة", url: "https://docs.google.com/presentation/d/1URKldeVsh9Qo9SMJfEWx4GtcBnwf3nbX/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "presentation" },
            { name: "شرح + سلايدات توفير خدمة العملاء في مجال الضيافة", url: "https://docs.google.com/presentation/d/1esx5pUcWH_Sb2Wecc2AZqNv4g9vT1N0t/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "presentation" },
          ],
        },
        teacherGuide: {
          files: [
            { name: "دليل المعلم مجال الضيافة", url: "https://docs.google.com/document/d/1qPK06jBQzyTRsC7pRW9zuBLQJfFXauz0/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "دليل المعلم توفير خدمة العملاء في مجال الضيافة", url: "https://docs.google.com/document/d/1xLMmyesN4D2nSDsHaFOw47Zgh7jaW_HU/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
          ],
        },
        assignments: {
          files: [
            { name: "مهمة مجال الضيافة", url: "https://docs.google.com/document/d/1sQwMOPfPD-PSUuW7zGieV7BBHXn2EZie/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "مهمة توفير خدمة العملاء في مجال الضيافة", url: "https://docs.google.com/document/d/1oQdojhqAIq9nHRCfR4BJYcIIyjnURs4r/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
          ],
        },
      },
      semester2: {
        specs: {
          files: [
            { name: "جدول المواصفات الإشراف على خدمة الأغذية والمشروبات", url: "https://drive.google.com/file/d/1_FWPdCYrs8G_4uWBTNY-BZFb7ydjgKUm/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات عمليات مكاتب الاستقبال", url: "https://drive.google.com/file/d/1I8GcoHIOb_7xF8IqoWaFDNWOQXCkNdJU/view?usp=drive_link", type: "pdf" },
          ],
        },
        books: {
          files: [
            { name: "كتاب الإشراف على خدمة الأغذية والمشروبات", url: "https://drive.google.com/file/d/1N4UhF1AlA4AYMe6nOBBJnJm0kcITQ_O7/view?usp=drive_link", type: "pdf" },
            { name: "كتاب عمليات مكاتب الاستقبال", url: "https://drive.google.com/file/d/1fLS3ejeTTuBhCXDrFySnPFvIa-3-ZSL-/view?usp=drive_link", type: "pdf" },
          ],
        },
        explanations: {
          files: [
            { name: "شرح + سلايدات الإشراف على خدمة الأغذية والمشروبات", url: "https://drive.google.com/file/d/1N4UhF1AlA4AYMe6nOBBJnJm0kcITQ_O7/view?usp=drive_link", type: "pdf" },
            { name: "شرح + سلايدات عمليات مكاتب الاستقبال", url: "https://drive.google.com/file/d/1fLS3ejeTTuBhCXDrFySnPFvIa-3-ZSL-/view?usp=drive_link", type: "pdf" },
          ],
        },
        teacherGuide: {
          files: [],
        },
        assignments: {
          files: [
            { name: "مهمة الإشراف على خدمة الأغذية والمشروبات", url: "https://docs.google.com/document/d/1GxoycJlMfLxRma9qSso-7sxO2Off_H_U/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "مهمة عمليات مكاتب الاستقبال", url: "https://docs.google.com/document/d/1FVy0YkScKmqfet5h35Mv9nQlo0DlvFYY/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
          ],
        },
      },
      semester3: {
        specs: {
          files: [
            { name: "جدول المواصفات البيئة والاستدامة في مجال الضيافة", url: "https://drive.google.com/file/d/180jwAhYFyvVMWXUE57QhGD7BgIrL0MFb/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات مطبخ بلدك", url: "https://drive.google.com/file/d/1wCRVxu0cC_5wXyqrp1kA9IXCYGo-jPFy/view?usp=drive_link", type: "pdf" },
          ],
        },
        books: {
          files: [
            { name: "كتاب البيئة والاستدامة في مجال الضيافة", url: "https://drive.google.com/file/d/1mykbcUYO-_Ui7j541fHJp80I1sMRPVde/view?usp=drive_link", type: "pdf" },
            { name: "كتاب مطبخ بلدك", url: "https://drive.google.com/file/d/1GUVqoeXeeOUIaYukMVy3GpfhP31ErLqC/view?usp=drive_link", type: "pdf" },
          ],
        },
        explanations: {
          files: [
            { name: "شرح + سلايدات البيئة والاستدامة في مجال الضيافة", url: "https://docs.google.com/presentation/d/1EbWUCJHqyWV8hRM5hUMMOCUoLUXEJsPV/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "presentation" },
            { name: "شرح + سلايدات مطبخ بلدك", url: "https://docs.google.com/presentation/d/1xkRQIKzskuLVbDjIb6qCF5ED46TT9i8w/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "presentation" },
          ],
        },
        teacherGuide: {
          files: [
            { name: "دليل المعلم البيئة والاستدامة في مجال الضيافة", url: "https://docs.google.com/document/d/1JdEX8J_ufynwEXXK-dgycgzAT3MsUQJM/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "دليل المعلم مطبخ بلدك", url: "https://docs.google.com/document/d/1kITgFsu5y4q1q49K1WnJivJdUB8BUrQ4/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
          ],
        },
        assignments: {
          files: [
            { name: "مهمة البيئة والاستدامة في مجال الضيافة", url: "https://docs.google.com/document/d/1hjQSpYyDekKvlXpuDrLHHLzBGjVh3bbx/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "مهمة مطبخ بلدك", url: "https://docs.google.com/document/d/18W3qiPUwxIyIDEwm8JfgNOnEn-Oi_Kjk/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
          ],
        },
      },
    },
    grade12: {
      semester1: {
        specs: {
          files: [
            { name: "جدول المواصفات مبادئ القيادة والإشراف", url: "https://drive.google.com/file/d/14esWO_0G3bRQHGn4WEPoAKXdIqupL1un/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات عمليات الإقامة", url: "https://drive.google.com/file/d/14esWO_0G3bRQHGn4WEPoAKXdIqupL1un/view?usp=drive_link", type: "pdf" },
          ],
        },
        books: {
          files: [
            { name: "كتاب مبادئ القيادة والإشراف", url: "https://drive.google.com/file/d/1VWzl5_n_qFxZ3R3ZN2UhrntPQ2fV43cn/view?usp=drive_link", type: "pdf" },
            { name: "كتاب عمليات الإقامة", url: "https://drive.google.com/file/d/1SjCfL5OVRTBWx_hguXX0jzoHu6tQX-i6/view?usp=drive_link", type: "pdf" },
          ],
        },
        explanations: {
          files: [
            { name: "شرح + سلايدات مبادئ القيادة والإشراف", url: "https://docs.google.com/presentation/d/1y_02v1hDrM0QqPrufRx6sJ1YYoLohm40/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "presentation" },
            { name: "شرح + سلايدات عمليات الإقامة", url: "https://docs.google.com/presentation/d/1QfsSp4szoDpW0HFl6mIUCtTA3KLRq9Gw/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "presentation" },
          ],
        },
        teacherGuide: {
          files: [
            { name: "دليل المعلم مبادئ القيادة والإشراف", url: "https://docs.google.com/document/d/12O920LB9q5LjUNanm-_mmiQIchybE2f1/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "دليل المعلم عمليات الإقامة", url: "https://docs.google.com/document/d/1wwR4JLLRJFxvDNeA4FIWKjgc7tNZ5s7_/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
          ],
        },
        assignments: {
          files: [
            { name: "مهمة مبادئ القيادة والإشراف", url: "https://docs.google.com/document/d/1xqznYhIM12zvdBLf8dnveeMKcJepr7Kk/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "مهمة عمليات الإقامة", url: "https://docs.google.com/document/d/13m2vDNUKdD9FSs1IFHD6dokEy3sAhsAd/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
          ],
        },
      },
      semester2: {
        specs: {
          files: [
            { name: "جدول المواصفات الإشراف على سلامة الغذاء في مجال الضيافة", url: "https://drive.google.com/file/d/1qApietkON0cEvy6h24GJwfm70DShxZes/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات التكنولوجيا والوسائط الرقمية في مجال الضيافة", url: "https://drive.google.com/file/d/1FguRAErDx-VWHe4m9eCA2_ez_ZxrHSwn/view?usp=drive_link", type: "pdf" },
          ],
        },
        books: {
          files: [
            { name: "كتاب الإشراف على سلامة الغذاء في مجال الضيافة", url: "https://drive.google.com/file/d/10oZUICT2Pad0639a2RwYnWYgE-xaCM98/view?usp=drive_link", type: "pdf" },
            { name: "كتاب التكنولوجيا والوسائط الرقمية في مجال الضيافة", url: "https://drive.google.com/file/d/1_XpCUy0YEedLgIRR9z8Q6YFWFbexLjof/view?usp=drive_link", type: "pdf" },
          ],
        },
        explanations: {
          files: [],
        },
        teacherGuide: {
          files: [
            { name: "دليل المعلم الإشراف على سلامة الغذاء في مجال الضيافة", url: "https://docs.google.com/document/d/1Y1-XcFeSyiWyIufzAv1ws8yOlsD1mMSL/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "دليل المعلم التكنولوجيا والوسائط الرقمية في مجال الضيافة", url: "https://docs.google.com/document/d/1I4yX6qYdSh0qrUag3SOykYOMNH_ussWp/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
          ],
        },
        assignments: {
          files: [
            { name: "مهمة الإشراف على سلامة الغذاء في مجال الضيافة", url: "https://docs.google.com/document/d/1lO6qvvDmjMcu9s5kohQNmJ3-x6ceZIMj/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "مهمة التكنولوجيا والوسائط الرقمية في مجال الضيافة", url: "https://docs.google.com/document/d/1cvooeUVoemgJwANZejALF8qJRYcLi9uE/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
          ],
        },
      },
      semester3: {
        specs: {
          files: [
            { name: "جدول المواصفات مراقبة التكاليف لمشرفي الضيافة", url: "https://drive.google.com/file/d/1viyFMSMHm02IbE_Kxu2tx4tngbZ1OHfO/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات البيع الشخصي والمهارات الترويجية في قطاع الضيافة", url: "https://drive.google.com/file/d/1Qzdmz3aBAA_vDDyUdXM09OziYcbAeOk3/view?usp=drive_link", type: "pdf" },
          ],
        },
        books: {
          files: [
            { name: "كتاب مراقبة التكاليف لمشرفي الضيافة", url: "https://drive.google.com/file/d/17Oi7jYNqP_qcJJ8xNrWBmj6XXWey2JJx/view?usp=drive_link", type: "pdf" },
            { name: "كتاب البيع الشخصي والمهارات الترويجية في قطاع الضيافة", url: "https://drive.google.com/file/d/1MDIP-9ODjvLYsIQG2piAqMaYF6mcHEyW/view?usp=drive_link", type: "pdf" },
          ],
        },
        explanations: {
          files: [
            { name: "شرح + سلايدات مراقبة التكاليف لمشرفي الضيافة", url: "https://docs.google.com/presentation/d/1wdalVhRUbF4775wUD78r13lw9WawQvlk/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "presentation" },
            { name: "شرح + سلايدات البيع الشخصي والمهارات الترويجية في قطاع الضيافة", url: "https://docs.google.com/presentation/d/1EEjzvM-5ubqw4Cphwwv3w5iA_JJkR0Cx/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "presentation" },
          ],
        },
        teacherGuide: {
          files: [
            { name: "دليل المعلم مراقبة التكاليف لمشرفي الضيافة", url: "https://docs.google.com/document/d/1oQL2OEmeCRlYf71F7FoTPPAvsMC6uR87/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "دليل المعلم البيع الشخصي والمهارات الترويجية في قطاع الضيافة", url: "https://docs.google.com/document/d/1V0tA030lVa81_ajBV30Qrzm_S9HDplRH/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
          ],
        },
        assignments: {
          files: [
            { name: "مهمة مراقبة التكاليف لمشرفي الضيافة", url: "https://docs.google.com/document/d/1mlCSY5T8kJMgvBBFzGGXeVdI49SO_U7u/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
            { name: "مهمة البيع الشخصي والمهارات الترويجية في قطاع الضيافة", url: "https://docs.google.com/document/d/11VE9nFFCiRHIQLKUTTca1Rsikjh7Yj3t/edit?usp=drive_link&ouid=103331752942697650285&rtpof=true&sd=true", type: "doc" },
          ],
        },
      },
    },
  },
  business: {
    grade10: {
      semester1: {
        specs: {
          files: [
            { name: "جدول المواصفات استخدام شركات عبر الإنترنت", url: "https://drive.google.com/file/d/17281wFSOEH3JXixofnxSYqJPmDxZhHoy/view?usp=sharing", type: "pdf" },
          ],
        },
        books: {
          files: [
            { name: "كتاب الغرض من الشركة", url: "https://drive.google.com/file/d/1yIcVWoB_5lkbhEL6roWMU09GNx14I083/view", type: "pdf" },
            { name: "كتاب مؤسسات بالأعمال", url: "https://drive.google.com/file/d/1EVq7MmAQHOXMm2MwgkvHTCgNA8aUFJJO/view", type: "pdf" },
            { name: "كتاب التنبؤ بالأداء المالي للشركة", url: "https://drive.google.com/file/d/1TzJ2M87tMQ-noUrn00TToR7lxDUiU7RS/view", type: "pdf" },
            { name: "كتاب خطة تسويق", url: "https://drive.google.com/file/d/1LmeNL47lQsyRea2e5Qw3dZTcoVIRYJgz/view", type: "pdf" },
          ],
        },
        explanations: { files: [] },
        teacherGuide: { files: [] },
        assignments: { files: [] },
      },
      semester2: {
        specs: { files: [] },
        books: {
          files: [
            { name: "كتاب إنشاء شركة صغيرة", url: "https://drive.google.com/file/d/1mHaSHvTfxCVdGhtKVV6Q3ZxoZJSTAvVg/view", type: "pdf" },
            { name: "كتاب العمل ضمن فريق", url: "https://drive.google.com/file/d/1iIXHTMXNGiQtotYl7Ztf5N1PIfCnhuUY/view", type: "pdf" },
            { name: "كتاب إدارة الشؤون المالية الشخصية", url: "https://drive.google.com/file/d/1-gNkQQIJw3OBoJXjRanfJ_U-dOAuOYMT/view", type: "pdf" },
            { name: "كتاب تقنيات العرض والترويج البصري لشركات البيع بالتجزئة", url: "https://drive.google.com/file/d/1TIfCNyyAGNCnBQ3_elHleuGuqGRdPP0y/view", type: "pdf" },
          ],
        },
        explanations: { files: [] },
        teacherGuide: { files: [] },
        assignments: {
          files: [
            { name: "مهمة إدارة الشؤون المالية الشخصية", url: "https://drive.google.com/file/d/1sEVkck7Z0_qXJQ6rzaDCv60peHmPhe8j/view?usp=sharing", type: "pdf" },
            { name: "مهمة الأشخاص بالمنظمات عاشر فصل ثالث", url: "https://docs.google.com/document/d/1pjrjtNgFFFAQ6EI2ZB8jDjOFdrMWS0vb/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          ],
        },
      },
      semester3: {
        specs: { files: [] },
        books: {
          files: [
            { name: "كتاب الموظفون في الشركات", url: "https://drive.google.com/file/d/1ON9NiSMuE66Ln-8qqxPvhSeJV7nQasPg/view", type: "pdf" },
            { name: "كتاب الشركات عبر الإنترنت", url: "https://drive.google.com/file/d/1MUGybReOqCJCu0waDKaVLmwWYeGz65n6/view", type: "pdf" },
            { name: "كتاب أخلاقيات العمل", url: "https://drive.google.com/file/d/1U6crAMpmRIOSSHzYOL3S6UgeDfiZQGHm/view", type: "pdf" },
            { name: "كتاب إدارة شركة صغيرة", url: "https://drive.google.com/file/d/1ts1TU7s4InsNjuj3lzZ8jLOF_c0IUP6O/view", type: "pdf" },
          ],
        },
        explanations: { files: [] },
        teacherGuide: {
          files: [
            { name: "دليل المعلم استخدام شركات عبر الإنترنت", url: "https://drive.google.com/file/d/1TgQTj-mC6d6z0h9KRT2JLaGf9pScxWLN/view?usp=drive_link", type: "pdf" },
            { name: "دليل المعلم الأشخاص بالمنظمات", url: "https://drive.google.com/file/d/1hdDq5o40ubaVDufEkOeI-UQFPEWg5z91/view?usp=drive_link", type: "pdf" },
          ],
        },
        assignments: {
          files: [
            { name: "مهمة الشركات عبر الإنترنت", url: "https://docs.google.com/document/d/19QtF1qk18F10RooZJXSEKaZT1YdFgcf2/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          ],
        },
      },
    },
    grade11: {
      semester1: {
        specs: {
          files: [
            { name: "جدول المواصفات استكشاف الأعمال", url: "https://drive.google.com/file/d/1sEVkck7Z0_qXJQ6rzaDCv60peHmPhe8j/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات البحث والتخطيط لحملة تسويقية", url: "https://drive.google.com/file/d/1sEVkck7Z0_qXJQ6rzaDCv60peHmPhe8j/view?usp=drive_link", type: "pdf" },
          ],
        },
        books: {
          files: [
            { name: "كتاب استكشاف الأعمال", url: "https://drive.google.com/file/d/1TwIlK7mgOnhIpsVUXRtu9Oyet8z3RV8v/view", type: "pdf" },
            { name: "كتاب البحث والتخطيط لحملة تسويقية", url: "https://drive.google.com/file/d/1p4fhKoj6_G6ruF-d16wfnJzkAn6c6tXV/view", type: "pdf" },
          ],
        },
        explanations: {
          files: [
            { name: "الدليل الإرشادي للمعلم استكشاف الأعمال (PART 2)", url: "https://drive.google.com/file/d/1Lq1Ksvtf7gFDCvrc4khxFFfCiHXoywYG/view?usp=drive_link", type: "pdf" },
          ],
        },
        teacherGuide: {
          files: [
            { name: "دليل المعلم استكشاف الأعمال", url: "https://drive.google.com/file/d/1q5gFr0Q3Ye8rx6r1mQLPojzU2aQVF3Ff/view?usp=drive_link", type: "pdf" },
          ],
        },
        assignments: { files: [] },
      },
      semester2: {
        specs: {
          files: [
            { name: "جدول المواصفات تمويل الأعمال", url: "https://drive.google.com/file/d/1sEVkck7Z0_qXJQ6rzaDCv60peHmPhe8j/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات خدمة العملاء", url: "https://drive.google.com/file/d/19xEE5TuPwVeQlJj9FSisPl3zLn6K2TlR/view?usp=drive_link", type: "pdf" },
          ],
        },
        books: {
          files: [
            { name: "كتاب تمويل الأعمال", url: "https://drive.google.com/file/d/16xZelW6ivwLvdVHmonm1TPljtsSNBlKa/view", type: "pdf" },
          ],
        },
        explanations: {
          files: [
            { name: "دليل الإرشادي تمويل الأعمال (PART 2)", url: "https://drive.google.com/file/d/1vcMle0WlbTqESwOHBZTMZXFKhidLdzHO/view?usp=drive_link", type: "pdf" },
            { name: "دراسة الحالة (1) 2026", url: "https://drive.google.com/file/d/1Q6aVQn_n5qrefbUpIVZoxxkD1FBJ1PC1/view?usp=drive_link", type: "pdf" },
            { name: "دراسة الحالة (2) 2026", url: "https://drive.google.com/file/d/14_XtYViKo9x6yUwOBfx7Pqj1MTfN3QTf/view?usp=drive_link", type: "pdf" },
          ],
        },
        teacherGuide: { files: [] },
        assignments: { files: [] },
      },
      semester3: {
        specs: {
          files: [
            { name: "جدول المواصفات أخلاقيات العمل", url: "https://drive.google.com/file/d/1dWn08Iel6edJIjkqBhZsvVLPOJD3VdWd/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات إدارة إحدى الفعاليات", url: "https://drive.google.com/file/d/1sEVkck7Z0_qXJQ6rzaDCv60peHmPhe8j/view?usp=drive_link", type: "pdf" },
          ],
        },
        books: {
          files: [
            { name: "كتاب إدارة إحدى الفعاليات", url: "https://drive.google.com/file/d/1a43MOK0lrEiC7a_ni4sGd0MxIrPsIqHA/view", type: "pdf" },
          ],
        },
        explanations: {
          files: [
            { name: "دليل الإرشادي إدارة إحدى الفعاليات", url: "https://drive.google.com/file/d/1AP-aDjOFz61vC0XlJqZQ7WhMgY10Xgpb/view?usp=drive_link", type: "pdf" },
          ],
        },
        teacherGuide: { files: [] },
        assignments: { files: [] },
      },
    },
    grade12: {
      semester1: {
        specs: {
          files: [
            { name: "جدول المواصفات مبادئ الإدارة", url: "https://drive.google.com/file/d/1sEVkck7Z0_qXJQ6rzaDCv60peHmPhe8j/view?usp=sharing", type: "pdf" },
          ],
        },
        books: {
          files: [
            { name: "كتاب مبادئ الإدارة", url: "https://drive.google.com/file/d/1pbhgDxRzbdvooDPrde3Yyn67OKnFXjOu/view", type: "pdf" },
          ],
        },
        explanations: { files: [] },
        teacherGuide: { files: [] },
        assignments: { files: [] },
      },
      semester2: {
        specs: {
          files: [
            { name: "جدول المواصفات اتخاذ قرارات الأعمال", url: "https://drive.google.com/file/d/1sEVkck7Z0_qXJQ6rzaDCv60peHmPhe8j/view?usp=sharing", type: "pdf" },
            { name: "جدول المواصفات الموارد البشرية", url: "https://drive.google.com/file/d/1sEVkck7Z0_qXJQ6rzaDCv60peHmPhe8j/view?usp=sharing", type: "pdf" },
          ],
        },
        books: {
          files: [
            { name: "كتاب اتخاذ قرارات الأعمال", url: "https://drive.google.com/file/d/1YPK30l9OUB2tBHp8IPCEuPXwja_hWy4R/view", type: "pdf" },
            { name: "كتاب الموارد البشرية", url: "https://drive.google.com/file/d/19MlX9wzzLSyYPv326ghT7FJReULNiMCZ/view", type: "pdf" },
          ],
        },
        explanations: {
          files: [
            { name: "دراسة خدمة عملاء (نموذج مناقشة الطالب للتحقق من عدم وجود سرقة أدبية أو غش)", url: "https://docs.google.com/document/d/1uLeYd6B3Vgn1FmSy0lEqZvqNMkUoM0VO/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
            { name: "دليل الإرشادي دراسة خدمة عملاء", url: "https://docs.google.com/document/d/1uPDPxyh4SEEG1Qzfz55ToHWIauJrWUVs/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
            { name: "دليل الإرشادي دراسة خدمة عملاء", url: "https://drive.google.com/file/d/1HmE5z_p6rRW3XKbRNq6Atw7PZ7gC1SXH/view?usp=drive_link", type: "pdf" },
            { name: "دراسة خدمة عملاء (نموذج استلام وتسليم الواجب)", url: "https://docs.google.com/document/d/1iyUhygaqs2jW5bXdmGKdYEmLi9ukof66/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          ],
        },
        teacherGuide: { files: [] },
        assignments: { files: [] },
      },
      semester3: {
        specs: {
          files: [
            { name: "جدول المواصفات دراسة خدمة العملاء", url: "https://drive.google.com/file/d/1sEVkck7Z0_qXJQ6rzaDCv60peHmPhe8j/view?usp=sharing", type: "pdf" },
            { name: "جدول المواصفات أخلاقيات الأعمال", url: "https://drive.google.com/file/d/1sEVkck7Z0_qXJQ6rzaDCv60peHmPhe8j/view?usp=sharing", type: "pdf" },
          ],
        },
        books: {
          files: [
            { name: "كتاب دراسة خدمة العملاء", url: "https://drive.google.com/file/d/19MlX9wzzLSyYPv326ghT7FJReULNiMCZ/view", type: "pdf" },
            { name: "كتاب أخلاقيات الأعمال", url: "https://drive.google.com/file/d/18WTF7xdP9CRMCfJoKetYY88A1aJ1xLEo/view", type: "pdf" },
          ],
        },
        explanations: { files: [] },
        teacherGuide: { files: [] },
        assignments: { files: [] },
      },
    },
  },
  art: {
    grade10: {
      semester1: {
        specs: {
          files: [
            { name: "جدول المواصفات تطوير الفن والتصميم استجابة لموضوع ما", url: "https://drive.google.com/file/d/1miWmegM06UAu2LBctegYoeDdeH8iVS2n/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات الاتصال المرئي", url: "https://drive.google.com/file/d/1miWmegM06UAu2LBctegYoeDdeH8iVS2n/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات العمل مع موجز المنسوجات", url: "https://drive.google.com/file/d/1miWmegM06UAu2LBctegYoeDdeH8iVS2n/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات العمل مع موجز التصوير الفوتوغرافي", url: "https://drive.google.com/file/d/1miWmegM06UAu2LBctegYoeDdeH8iVS2n/view?usp=drive_link", type: "pdf" },
          ],
        },
        books: { files: [] },
        explanations: {
          files: [
            { name: "طريقة حل وتحليل واجب التصوير الفوتوغرافي", url: "https://drive.google.com/file/d/1KINJKYY-uzT2BS3N20HxPt2aiulVMpr0/view?usp=drive_link", type: "pdf" },
            { name: "طريقة حل + شرح مهمة تصميم الجرافيكي (A)", url: "https://drive.google.com/file/d/19HI6nKHx0k2-qo7wKYAV7z5HLulj320G/view?usp=drive_link", type: "pdf" },
            { name: "طريقة حل + شرح مهمة تصميم الجرافيكي (B)", url: "https://drive.google.com/file/d/1Mit3rBNuR63MKXw2ww4b1YPeiemL55LR/view?usp=drive_link", type: "pdf" },
            { name: "طريقة حل + شرح مهمة تصميم الجرافيكي (C)", url: "https://drive.google.com/file/d/1XpSJ6gm_dNw1tGzME3nnU9C6XbKTsRaF/view?usp=drive_link", type: "pdf" },
            { name: "شرح + طريقة حل مهمة التواصل البصري", url: "https://docs.google.com/document/d/1yiMARPiXBahABhii9YpzUeUYredm1j4d/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          ],
        },
        teacherGuide: { files: [] },
        assignments: {
          files: [
            { name: "مهمة التعامل مع موجز التصوير الفوتوغرافي", url: "https://docs.google.com/document/d/1460KMFZYGWeKR9oi6rnNIlm2joXPSiTD/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          ],
        },
      },
      semester2: {
        specs: {
          files: [
            { name: "جدول المواصفات بناء محفظة الفن والتصميم", url: "https://drive.google.com/file/d/1miWmegM06UAu2LBctegYoeDdeH8iVS2n/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات مشروع بحث عملي", url: "https://drive.google.com/file/d/1miWmegM06UAu2LBctegYoeDdeH8iVS2n/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات العمل مع موجز متخصص نظرة عامة", url: "https://drive.google.com/file/d/1miWmegM06UAu2LBctegYoeDdeH8iVS2n/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات العمل مع موجز تصميم الأزياء", url: "https://drive.google.com/file/d/1miWmegM06UAu2LBctegYoeDdeH8iVS2n/view?usp=drive_link", type: "pdf" },
          ],
        },
        books: { files: [] },
        explanations: {
          files: [
            { name: "سلايدات + شرح مهمة المنسوجات", url: "https://docs.google.com/presentation/d/1Ne4EC1qRCPQ2sW8XnmA7gRNyn508_G7L/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "presentation" },
            { name: "قالب طريقة حل + شرح مهمة المنسوجات", url: "https://docs.google.com/document/d/1PJsyf553G995mUWYohAbHj92WeWtsLUq/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          ],
        },
        teacherGuide: { files: [] },
        assignments: {
          files: [
            { name: "مهمة مشروع بحث عملي", url: "https://docs.google.com/document/d/11qr38EqIMY_qXUkXSxQLoSpfiW35n5hD/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          ],
        },
      },
      semester3: {
        specs: {
          files: [
            { name: "جدول المواصفات مراجع سياقية في الفن والتصميم", url: "https://drive.google.com/file/d/1miWmegM06UAu2LBctegYoeDdeH8iVS2n/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات العمل مع موجز التصميم الجرافيكي", url: "https://drive.google.com/file/d/1miWmegM06UAu2LBctegYoeDdeH8iVS2n/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات العمل مع ملخص التصميم ثلاثي الأبعاد", url: "https://drive.google.com/file/d/1miWmegM06UAu2LBctegYoeDdeH8iVS2n/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات العمل مع موجز الفنون البصرية", url: "https://drive.google.com/file/d/1miWmegM06UAu2LBctegYoeDdeH8iVS2n/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات العمل مع ملخص الفن الرقمي والتصميم", url: "https://drive.google.com/file/d/1miWmegM06UAu2LBctegYoeDdeH8iVS2n/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات العمل مع ملخص لحرف التصميم", url: "https://drive.google.com/file/d/1miWmegM06UAu2LBctegYoeDdeH8iVS2n/view?usp=drive_link", type: "pdf" },
            { name: "جدول المواصفات العمل مع موجز الصور المتحركة", url: "https://drive.google.com/file/d/1miWmegM06UAu2LBctegYoeDdeH8iVS2n/view?usp=drive_link", type: "pdf" },
          ],
        },
        books: { files: [] },
        explanations: {
          files: [
            { name: "سلايدات + شرح مهمة تصميم الجرافيكي", url: "https://docs.google.com/presentation/d/1oMTVRT91OHCNnNvQuJukBTC7PiefFsK0/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "presentation" },
          ],
        },
        teacherGuide: {
          files: [
            { name: "دليل المعلم التصميم الجرافيكي", url: "https://drive.google.com/file/d/1a4FrLEtWXLouGU_lGp6lD4BBXnITPRMU/view?usp=drive_link", type: "pdf" },
          ],
        },
        assignments: {
          files: [
            { name: "مهمة التعامل مع موجز التصميم الجرافيكي", url: "https://docs.google.com/document/d/1NiHUruTUALFEJKpqvRI2XQ66WHhXrHVx/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          ],
        },
      },
    },
    grade11: {
      semester1: {
        specs: { files: [] },
        books: { files: [] },
        explanations: {
          files: [
            { name: "طريقة حل مهمة التصوير الفوتوغرافي (المستوى الثالث)", url: "https://drive.google.com/file/d/1xojOuMJhKhWFhcbzvoB7MpS8jUyr1mTo/view?usp=drive_link", type: "pdf" },
          ],
        },
        teacherGuide: { files: [] },
        assignments: {
          files: [
            { name: "مهمة مشروع الطاقة", url: "https://docs.google.com/document/d/1IxuWDijHidu0vyqxM4dZcNvDMKLJC96M/edit?usp=sharing&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          ],
        },
      },
      semester2: {
        specs: { files: [] },
        books: { files: [] },
        explanations: {
          files: [
            { name: "طريقة حل مهمة التصوير الفوتوغرافي (المستوى الثالث)", url: "https://drive.google.com/file/d/1xojOuMJhKhWFhcbzvoB7MpS8jUyr1mTo/view?usp=drive_link", type: "pdf" },
            { name: "طريقة حل + تحليل معايير مهمة الأزياء (المستوى الثالث)", url: "https://drive.google.com/file/d/1MOL-n31757_nW_H2zGNcLs7ZxEfMEx_8/view?usp=drive_link", type: "pdf" },
            { name: "شرح مهمة الرحلات", url: "https://docs.google.com/document/d/1WTv_mq9OCNylTy0YDayDJ-0lmU4f55dq/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          ],
        },
        teacherGuide: { files: [] },
        assignments: {
          files: [
            { name: "مهمة الرحلات", url: "https://docs.google.com/document/d/1eez8iWjaDYIrFlL9rzAXdMgAB6zkhjJ2/edit?usp=sharing&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
            { name: "مهمة الرحلات", url: "https://docs.google.com/document/d/11pEbTrF8JcYYFDWCZeZV706JMBoJ2Wj6/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          ],
        },
      },
      semester3: {
        specs: { files: [] },
        books: { files: [] },
        explanations: {
          files: [
            { name: "شرح مهمة الطاقة", url: "https://drive.google.com/file/d/1xJqh218UyIj13SuNheQ0ny1t_k68O56E/view?usp=drive_link", type: "pdf" },
            { name: "شرح مهمة مشروع الضمير", url: "https://docs.google.com/document/d/1jQO0ec38iYQ_8TwRnpZo7_QpOhU0v2rq/edit?usp=drive_link&ouid=111743495162828167240&rtpof=true&sd=true", type: "doc" },
          ],
        },
        teacherGuide: { files: [] },
        assignments: {
          files: [
            { name: "مهمة الضمير", url: "https://drive.google.com/file/d/1-3AEymqbfmYvVA8NRF0l8HYR3FvMQEnq/view?usp=drive_link", type: "pdf" },
          ],
        },
      },
    },
    grade12: JSON.parse(JSON.stringify(emptyGrade)),
  },
  construction: JSON.parse(JSON.stringify(emptyDepartment)),
  beauty: BEAUTY_RESOURCES,
  sports: SPORTS_RESOURCES,
  healthcare: HEALTHCARE_RESOURCES,
  engineering: ENGINEERING_RESOURCES,
};

export const gradeLabels: Record<string, string> = {
  grade10: "الصف العاشر",
  grade11: "الصف الأول ثانوي",
  grade12: "الصف الثاني ثانوي",
};

export const semesterLabels: Record<string, string> = {
  semester1: "الفصل الأول",
  semester2: "الفصل الثاني",
  semester3: "الفصل الثالث",
};

export const categoryLabels: Record<string, string> = {
  books: "الكتب",
  specs: "جدول المواصفات",
  explanations: "الشروحات",
  teacherGuide: "دليل المعلم",
  assignments: "المهمات",
};

export const categoryIcons: Record<string, string> = {
  books: "📚",
  specs: "📋",
  explanations: "📝",
  teacherGuide: "👨‍🏫",
  assignments: "📄",
};
