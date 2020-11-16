import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { College } from './college.entity';
import { CourseToSubject } from './courseToSubject.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  collegeId: string;

  @ManyToOne(() => College)
  college: College;

  @Column()
  name: string;

  @Column()
  shortName: string;

  @OneToMany(() => CourseToSubject, courseToSubject => courseToSubject.course)
  courseToSubjects ?: CourseToSubject[];
}
