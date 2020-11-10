import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollegeController } from './controllers/college.controller';
import { College } from './entities/college.entity';
import { Course } from './entities/course.entity';
import { Subject } from './entities/subject.entity';
import { Country } from '../locale/entities/country.entity';
import { CollegeService } from './services/college.service';

@Module({
  imports: [TypeOrmModule.forFeature([College, Course, Subject, Country])],
  providers: [CollegeService],
  controllers: [CollegeController]
})
export class CollegeModule {}
