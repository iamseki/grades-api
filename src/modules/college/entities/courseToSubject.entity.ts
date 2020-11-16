import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Course } from './course.entity';
import { Subject } from './subject.entity';

@Entity('courses_subjects')
export class CourseToSubject {
  @PrimaryGeneratedColumn('uuid')
  courseId: string;

  @PrimaryGeneratedColumn('uuid')
  subjectId: string;

  @Column()
  semester: string;

  @ManyToOne(() => Course, course => course.courseToSubjects)
  course: Course

  @ManyToOne(() => Subject, subject => subject.courseToSubjects)
  subject: Subject
}
