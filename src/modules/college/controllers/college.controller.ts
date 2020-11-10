import { Body, Controller, HttpCode,Post } from '@nestjs/common';
import { CreateCollegeDTO } from '../dtos/create-college.dto';
import { CreateCoursesDTO } from '../dtos/create-courses.dto';
import { CollegeService } from '../services/college.service';
import { CourseService } from '../services/course.service';

@Controller('college')
export class CollegeController {
  constructor(
    private readonly collegeService: CollegeService,
    private readonly courseService: CourseService
    ) {}

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
