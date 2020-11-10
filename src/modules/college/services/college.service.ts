import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../../locale/entities/country.entity';
import { CreateCollegeDTO } from '../dtos/create-college.dto';
import { College } from '../entities/college.entity';

@Injectable()
export class CollegeService {
  constructor(
    @InjectRepository(College)
    private readonly collegeRepository: Repository<College>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>
  ){}

  public async list(): Promise<College[]> {
    const colleges = await this.collegeRepository.find({ select: [ "name", "shortName","country", "gradesSystem", "gradesAverage" ]})
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
