import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubjectsDTO } from '../dtos/create-subjects.dto';
import { InsertSubjectsIntoCourseDTO } from '../dtos/insert-subjects-to-course.dto';
import { Course } from '../entities/course.entity';
import { CourseToSubject } from '../entities/courseToSubject.entity';
import { Subject } from '../entities/subject.entity';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(CourseToSubject)
    private readonly courseToSubjectsRepository: Repository<CourseToSubject>
  ) { }

  async read(): Promise<Subject[]> {
    // TO DO , Add Some pagination, the result may be too big
    const subjects = await this.subjectRepository.find();
    return subjects;
  }

  async insert({ subjects }: CreateSubjectsDTO): Promise<void> {
    try {
      await this.subjectRepository.insert(subjects);
    }
    catch (err) {
      // 23505 Is related to unique key constraint violation
      if (err.code === '23505') {
        throw new HttpException(err.detail, HttpStatus.CONFLICT);
      }
    }
  }

  async insertSubjectsIntoCourse(courseId: string, { subjects }: InsertSubjectsIntoCourseDTO): Promise<void> {
    const course = await this.courseRepository.findOne({ where: { id: courseId } });
    if (!course) throw new HttpException("Course does'nt exist", HttpStatus.NOT_FOUND);

    try {
      const courseToSubjects: CourseToSubject[] = await Promise.all(subjects.map(async ({ name, semester }) => {
        const { id: subjectId } = await this.subjectRepository.findOne({ where: { name } });
        return {
          courseId,
          subjectId,
          semester
        }
      }))
      await this.courseToSubjectsRepository.insert(courseToSubjects)
    }
    catch (err) {
      // 23505 Is related to unique key constraint violation
      throw err.code === '23505' ? new HttpException(err.detail, HttpStatus.CONFLICT) :
        new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
