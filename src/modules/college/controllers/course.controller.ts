import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { Course } from '../entities/course.entity';
import { CourseService } from '../services/course.service';


@UseGuards(JwtAuthGuard)
@Controller('courses')
export class CourseController {
  constructor(
    private readonly courseService: CourseService,
  ) {}
  
  @Get()
  async read(): Promise<Course[]> {
    const courses = await this.courseService.list();
    return courses;
  }
}
