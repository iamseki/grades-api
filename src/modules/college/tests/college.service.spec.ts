import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HttpException } from '@nestjs/common';
import { CollegeService } from '../services/college.service';
import { College } from '../entities/college.entity';
import { Country } from '../../locale/entities/country.entity';
import { Course } from '../entities/course.entity';
import { CourseToSubject } from '../entities/courseToSubject.entity';

describe('College Service', () => {
  let collegeService: CollegeService;
  let findOne: jest.Mock;
  let save: jest.Mock;

  beforeEach(async () => {
    findOne = jest.fn();
    save = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CollegeService,
        {
          provide: getRepositoryToken(College),
          useValue: { findOne, save },
        },
        {
          provide: getRepositoryToken(Country),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Course),
          useValue: {},
        },
        {
          provide: getRepositoryToken(CourseToSubject),
          useValue: {},
        }
      ],
    }).compile();

    collegeService = module.get(CollegeService);
  });

  it('It should not be able to create a college without a country', async () => {
    await expect(
      collegeService.create({
        name: 'Testing',
        shortName: 'TS',
        gradesAverage: 5,
        gradesSystem: 'BR',
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
