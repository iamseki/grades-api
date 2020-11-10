import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { College } from './college.entity';
import { Subject } from './subject.entity';

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

  @ManyToMany(() => Subject)
  @JoinTable({ name: 'courses_subjects' })
  subjects: Subject[];
}
