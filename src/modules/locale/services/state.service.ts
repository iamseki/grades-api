import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from '../entities/country.entity';
import { State } from '../entities/state.entity';
import { Repository, getConnection } from 'typeorm';
import { CreateStatesDTO } from '../dtos/create-states.dto';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(Country)
    private readonly countriesRepository: Repository<Country>,
    @InjectRepository(State)
    private readonly statesRepository: Repository<State>,
  ) { }

  public async createMany({
    countryName,
    countryId,
    countryAbbreviation,
    states,
  }: CreateStatesDTO): Promise<void> {
    if (!countryName && !countryId && !countryAbbreviation)
      throw new HttpException(
        'Some country information should be provided',
        HttpStatus.BAD_REQUEST,
      );
    // country must exist  
    const country = await this.findCountry(countryName, countryId, countryAbbreviation);

    const statesArr: State[] = [];

    states.forEach(state => {
      statesArr.push({ name: state.name, abbreviation: state.abbreviation, countryId: country.id });
    });

    await this.insertTransaction(statesArr);
  }

  private async insertTransaction(states: State[]): Promise<void> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    try {
      // stablish real database connection using our new query runner
      await queryRunner.connect();
      await queryRunner.startTransaction();

      await this.statesRepository.insert(states);
      // commit transaction now:
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  private async findCountry(name: string, id: string, abbreviation: string): Promise<Country> {
    const country = await this.countriesRepository.findOne({
      where: [{ name }, { abbreviation }, { id }],
    });

    if (!country) throw new HttpException('Country provided doesn\'t exist', HttpStatus.NOT_FOUND)

    return country;
  }
}
