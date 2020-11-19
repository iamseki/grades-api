import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CourseToSubject } from './courseToSubject.entity';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  name: string;

  @Column()
  shortName: string;

  @OneToMany(() => CourseToSubject, courseToSubject => courseToSubject.subjects)
  courseToSubjects ?: CourseToSubject[];
}
