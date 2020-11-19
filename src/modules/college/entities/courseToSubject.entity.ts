import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Course } from './course.entity';
import { Subject } from './subject.entity';

@Entity('courses_subjects')
export class CourseToSubject {
  @PrimaryGeneratedColumn('uuid')
  coursesId: string;

  @PrimaryGeneratedColumn('uuid')
  subjectsId: string;

  @Column()
  semester: string;

  @ManyToOne(() => Course, course => course.courseToSubjects)
  courses: Course;

  @ManyToOne(() => Subject, subject => subject.courseToSubjects)
  subjects: Subject;
}
