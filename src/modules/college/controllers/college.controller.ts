import { Body, Controller, Get, HttpCode,Param,Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CollegeInfoDTO } from '../dtos/college-info.dto';
import { CreateCollegeDTO } from '../dtos/create-college.dto';
import { CreateCoursesDTO } from '../dtos/create-courses.dto';
import { College } from '../entities/college.entity';
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
  async read(@Param('id') id: string): Promise<CollegeInfoDTO>{
    const courses = await this.collegeService.read(id);
    return courses;
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  @Post()
  async create(@Body() createCollegeDTO: CreateCollegeDTO):Promise<void> {
    await this.collegeService.create(createCollegeDTO);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(201)
  @Post('courses')
  async insertCourses(@Body() createCoursesDTO: CreateCoursesDTO):Promise<void> {
    await this.courseService.create(createCoursesDTO);
  }
}
