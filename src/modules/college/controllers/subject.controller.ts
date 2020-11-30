import { Body, Controller, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CreateSubjectsDTO } from '../dtos/create-subjects.dto';
import { InsertSubjectsIntoCourseDTO } from '../dtos/insert-subjects-to-course.dto';
import { Subject } from '../entities/subject.entity';
import { SubjectService } from '../services/subject.service';


@UseGuards(JwtAuthGuard)
@Controller('subjects')
export class SubjectController {
  constructor(
    private readonly subjectService: SubjectService,
  ) {}
  
  @Get()
  async read(): Promise<Subject[]> {
    const subjects = await this.subjectService.read();
    return subjects;
  }

  @Post()
  @HttpCode(201)
  async insert(@Body() createSubjectsDto : CreateSubjectsDTO): Promise<void> {
    await this.subjectService.insert(createSubjectsDto);
  }

  @Post('course/:courseId')
  @HttpCode(201)
  async insertIntoCourse(@Param('courseId') courseId: string, @Body() insertSubjectsDto: InsertSubjectsIntoCourseDTO ): Promise<void> {
    await this.subjectService.insertSubjectsIntoCourse(courseId, insertSubjectsDto);
  }
}
