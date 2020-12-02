import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollegeController } from './controllers/college.controller';
import { College } from './entities/college.entity';
import { Course } from './entities/course.entity';
import { Subject } from './entities/subject.entity';
import { Country } from '../locale/entities/country.entity';
import { CollegeService } from './services/college.service';
import { CourseService } from './services/course.service';
import { CourseToSubject } from './entities/courseToSubject.entity';
import { SubjectController } from './controllers/subject.controller';
import { CourseController } from './controllers/course.controller';
import { SubjectService } from './services/subject.service';

@Module({
  imports: [TypeOrmModule.forFeature([College, Course, Subject, Country, CourseToSubject])],
  providers: [CollegeService, CourseService, SubjectService],
  controllers: [CollegeController, SubjectController, CourseController],
})
export class CollegeModule { }
