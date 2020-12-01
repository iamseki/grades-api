import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../../locale/entities/country.entity';
import { CollegeInfoDTO, CourseInfo } from '../dtos/college-info.dto';
import { CreateCollegeDTO } from '../dtos/create-college.dto';
import { College } from '../entities/college.entity';
import { CourseToSubject } from '../entities/courseToSubject.entity';

@Injectable()
export class CollegeService {
  constructor(
    @InjectRepository(College)
    private readonly collegeRepository: Repository<College>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @InjectRepository(CourseToSubject)
    private readonly courseToSubjectsRepository: Repository<CourseToSubject>,
  ) { }

  public async read(collegeId: string): Promise<CollegeInfoDTO> {
    const result = await this.courseToSubjectsRepository
      .createQueryBuilder('cs')
      .innerJoinAndSelect('cs.subject', 's')
      .innerJoinAndSelect('cs.course', 'c', `c.collegeId = '${collegeId}'`)
      .select(['c.name', 'c.shortName', 's.name', 's.shortName', 'cs.semester'])
      .orderBy('cs.semester')
      .getMany();

    const collegeInfo: CollegeInfoDTO = { courses: this.getCoursesInfo(result) };
    return collegeInfo;
  }

  private getCoursesInfo(coursesToSubject: CourseToSubject[]): CourseInfo[] {
    const coursesHashMap = new Map<string, CourseInfo>();
    coursesToSubject.forEach(rs => {
      const course = rs.course.name;

      // If key doesnt exists, initialize it !
      if (!coursesHashMap.has(course)) {
        coursesHashMap.set(course, {
          name: course,
          shortName: rs.course.shortName,
          subjects: [],
        });
      }
      // push into subjects of respective key course
      const { semester } = rs;
      const { name, shortName } = rs.subject;
      coursesHashMap.get(course).subjects.push({ name, shortName, semester });
    });

    const courses: CourseInfo[] = [];
    // const [ key, value ] of Map
    for (const [, c] of coursesHashMap) {
      courses.push(c);
    }

    return courses;
  }

  public async list(): Promise<College[]> {
    const colleges = await this.collegeRepository
      .createQueryBuilder('c')
      .leftJoinAndSelect('c.country', 'country')
      .select([
        'c.id',
        'c.name',
        'c.shortName',
        'c.gradesSystem',
        'c.gradesAverage',
        'country.name',
        'country.abbreviation',
      ])
      .getMany();

    return colleges;
  }

  public async create(createCollegeDto: CreateCollegeDTO): Promise<College> {
    const {
      countryId,
      countryName,
      countryAbbreviation,
      name,
      shortName,
      gradesSystem,
      gradesAverage,
    } = createCollegeDto;

    if (!countryName && !countryId && !countryAbbreviation)
      throw new HttpException(
        'Some country information should be provided',
        HttpStatus.BAD_REQUEST,
      );

    if (countryId) {
      const collegeExists = await this.collegeRepository.findOne({ where: { countryId, name, shortName }, select: ['id'] });
      if (collegeExists) throw new HttpException("College already exists", HttpStatus.CONFLICT);

      const college = await this.collegeRepository.save({
        countryId,
        name,
        shortName,
        gradesSystem,
        gradesAverage,
      });
      return college;
    }
    // if countryId were'nt provided it's necessary to query country Id
    const country = await this.countryRepository.findOne({
      where: [{ name: countryName }, { abbreviation: countryAbbreviation }],
      select: ['id'],
    });
    if (!country) throw new HttpException("Country provided doesn't exist", HttpStatus.NOT_FOUND);

    const collegeExists = await this.collegeRepository.findOne({ where: { countryId: country.id, name, shortName }, select: ['id'] });
    if (collegeExists) throw new HttpException("College already exists", HttpStatus.CONFLICT);
    const college = await this.collegeRepository.save({
      countryId: country.id,
      name,
      shortName,
      gradesSystem,
      gradesAverage,
    });

    return college;
  }
}
