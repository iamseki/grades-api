import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { College } from '../entities/college.entity';
import { Course } from '../entities/course.entity';
import { CreateCoursesDTO } from '../dtos/create-courses.dto';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(College)
    private readonly collegeRepository: Repository<College>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ){}

  public async create( createCoursesDto : CreateCoursesDTO): Promise<Course>{
    const { collegeId } = createCoursesDto;

    const college = await this.collegeRepository.findOne(collegeId);

    if(!college) throw new HttpException('College provided doesn\'t exist', HttpStatus.NOT_FOUND)
    
    const { name , shortName } = createCoursesDto

    const courseExists = await this.courseRepository.findOne({where: { name, shortName, collegeId }})
    if(courseExists) throw new HttpException('Course already registered', HttpStatus.CONFLICT)
    
    const course = new Course();

    course.collegeId = collegeId;
    course.name = name;
    course.shortName = shortName;

    await this.courseRepository.save(course);

    return course;
  }
}