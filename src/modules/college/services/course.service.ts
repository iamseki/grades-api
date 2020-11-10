import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { College } from '../entities/college.entity';
import { Course } from '../entities/course.entity';
import { Subject } from '../entities/subject.entity';
import { CreateCoursesDTO } from '../dtos/create-courses.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(College)
    private readonly collegeRepository: Repository<College>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>
  ){}

  public async create( createCoursesDto : CreateCoursesDTO): Promise<Course>{
    const { collegeId } = createCoursesDto;

    const college = await this.collegeRepository.findOne(collegeId);

    if(!college) throw new HttpException('College provided doesn\'t exist', HttpStatus.NOT_FOUND)
    
    const { name , shortName } = createCoursesDto
    const course = new Course();

    course.collegeId = collegeId;
    course.name = name;
    course.shortName = shortName;

    // If subjects was provided in this registration insert into database
    if(createCoursesDto.subjects.length > 0) {
      const subjects : Subject[] = [];

      createCoursesDto.subjects.forEach(s => {
        subjects.push({
          name: s.name,
          shortName: s.shortName
        })
      });
  
      const insertedSubjects = await this.subjectRepository.save(subjects);
      course.subjects = insertedSubjects;
    }

    await this.courseRepository.save(course);

    return course;
  }
}