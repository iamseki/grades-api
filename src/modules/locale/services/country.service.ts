import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from '../entities/country.entity';
import { Repository } from 'typeorm';
import { CreateCountryDTO } from '../dtos/create-country.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countriesRepository: Repository<Country>,
  ) { }

  public async create({ name, abbreviation }: CreateCountryDTO): Promise<Country> {
    //  if (!name || !abbreviation) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
    await this.validateUniqueConstraints({ name, abbreviation })

    const country = await this.countriesRepository.save({ name, abbreviation })
    return country
  }
  private async validateUniqueConstraints({ name, abbreviation }: CreateCountryDTO) {
    const countryExists = await this.countriesRepository.findOne({ where: { name } })
    if (countryExists) throw new HttpException('Country already exists', HttpStatus.CONFLICT)

    const abbreviationExists = await this.countriesRepository.findOne({ where: { abbreviation } })
    if (abbreviationExists) throw new HttpException('Abbreviation already exists', HttpStatus.CONFLICT)
  }
}
