import { Body, Controller, Get, HttpCode,Param,Post } from '@nestjs/common';
import { CreateCollegeDTO } from '../dtos/create-college.dto';
import { CreateCoursesDTO } from '../dtos/create-courses.dto';
import { College } from '../entities/college.entity';
import { Course } from '../entities/course.entity';
import { CollegeService } from '../services/college.service';
import { CourseService } from '../services/course.service';

@Controller('college')
export class CollegeController {
  constructor(
    private readonly collegeService: CollegeService,
    private readonly courseService: CourseService
    ) {}

  @Get()
  async list(): Promise<College[]>{
    const colleges = await this.collegeService.list();
    return colleges;
  }

  @Get(":id")
  async read(@Param('id') id: string): Promise<Course[]>{
    const courses = await this.collegeService.read(id);
    return courses;
  }

  @HttpCode(201)
  @Post()
  async create(@Body() createCollegeDTO: CreateCollegeDTO):Promise<void> {
    await this.collegeService.create(createCollegeDTO);
  }

  @HttpCode(201)
  @Post('courses')
  async insertCourses(@Body() createCoursesDTO: CreateCoursesDTO):Promise<void> {
    await this.courseService.create(createCoursesDTO);
  }
}
