export type CollegeInfoDTO = {
  courses: CourseInfo[];
};

export type CourseInfo = {
  name: string;
  shortName: string;
  subjects: SubjectInfo[];
};

type SubjectInfo = {
  name: string;
  shortName: string;
  semester: number;
};
