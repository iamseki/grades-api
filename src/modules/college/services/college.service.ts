import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../../locale/entities/country.entity';
import { CreateCollegeDTO } from '../dtos/create-college.dto';
import { College } from '../entities/college.entity';
import { Course } from '../entities/course.entity';
import { CourseToSubject } from '../entities/courseToSubject.entity';

@Injectable()
export class CollegeService {
  constructor(
    @InjectRepository(College)
    private readonly collegeRepository: Repository<College>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
    @InjectRepository(CourseToSubject)
    private readonly courseSubjectsRepository: Repository<CourseToSubject>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>
  ){}

  public async read(uuid: string):Promise<CourseToSubject[]> {
  // const courses = await this.courseSubjectsRepository.find({where: {collegeId: uuid}})

//const courses = await this.courseSubjectsRepository.find();

const courses = await this.courseSubjectsRepository.createQueryBuilder('cs')
.leftJoinAndSelect('cs.courses', 'courses')
.getMany();

    const test = await this.courseRepository.createQueryBuilder('co')
    .leftJoinAndSelect('co.courseToSubjects','cs')
    .leftJoinAndSelect('cs.subjects', 'subjects')
    .where({collegeId: uuid})
    //.select(['co.name', 'co.shortName', 'cs.subjects.name', 'cs.subjects.shortName'])
    .getMany()


  /*  const coursesT = await this.courseRepository.find({ where: { collegeId: uuid }, relations: ['subjects'],select:['name','shortName']})

    const courses = await this.courseRepository.createQueryBuilder('co')
    .leftJoinAndSelect('co.courseToSubjects', 'cs')
    //.where({ collegeId: uuid })
    //.select(['co.name', 'co.shortName', 'subject.name', 'subject.shortName'])
    .getMany()*/
    return courses; 
  }

  public async list(): Promise<College[]> {
    const colleges = await this.collegeRepository.createQueryBuilder('c')
    .leftJoinAndSelect('c.country','country')
    .select(['c.id','c.name','c.shortName', 'c.gradesSystem', 'c.gradesAverage', 'country.name', 'country.abbreviation'])
    .getMany();
    
    return colleges;
  }

  public async create( createCollegeDto : CreateCollegeDTO): Promise<College>{
    const { countryId, countryName, countryAbbreviation,name, shortName, gradesSystem,gradesAverage } = createCollegeDto

    if (!countryName && !countryId && !countryAbbreviation)
    throw new HttpException(
      'Some country information should be provided',
      HttpStatus.BAD_REQUEST,
    );

    if(countryId){
      const college = await this.collegeRepository.save(
        {
          countryId,
          name,
          shortName,
          gradesSystem,
          gradesAverage
        }
      );
      return college;
    }
    // if countryId were'nt provided it's necessary to query country Id
    const country = await this.countryRepository.findOne({where: [{ name: countryName }, {abbreviation: countryAbbreviation}], select: ["id"]});
    if (!country) throw new HttpException('Country provided doesn\'t exist', HttpStatus.NOT_FOUND);
    
    const college = await this.collegeRepository.save({
      countryId: country.id,
      name,
      shortName,
      gradesSystem,
      gradesAverage
    })

    return college;
  }
}
