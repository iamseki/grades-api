import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CountryService } from '../services/country.service';
import { Country } from '../entities/country.entity';
import { HttpException } from '@nestjs/common';

describe('Country Service', () => {
  let countryService: CountryService;
  let find: jest.Mock;
  let findOne: jest.Mock;
  let save: jest.Mock;

  beforeEach(async () => {
    findOne = jest.fn();
    save = jest.fn();
    find = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService,
        {
          provide: getRepositoryToken(Country),
          useValue: { findOne, save, find },
        },
      ],
    }).compile();

    countryService = module.get(CountryService);
  });

  it('It should not be able to create a country that name already exists', async () => {
    const country = new Country();

    country.name = 'testing';
    country.abbreviation = 'ts';

    findOne.mockReturnValue(Promise.resolve(country));

    await expect(
      countryService.create({ name: country.name, abbreviation: country.abbreviation }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it('It should not be able to create a country that abbreviation already exists', async () => {
    const country = new Country();

    country.name = 'testing';
    country.abbreviation = 'ts';

    findOne.mockReturnValue(Promise.resolve(undefined)); // the first findOne must be undefined cause name doesn't exists yet
    findOne.mockReturnValue(Promise.resolve(country));

    await expect(
      countryService.create({ name: 'testingggg', abbreviation: country.abbreviation }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  it('It should be able to create a country', async () => {
    const country = new Country();

    country.id = '4ee5a86c-a65e-456e-a839-c3374375cb6a';
    country.name = 'testing';
    country.abbreviation = 'ts';

    findOne.mockReturnValue(Promise.resolve(undefined));
    save.mockReturnValue(Promise.resolve(country));

    const mockedCountry = await countryService.create({
      name: country.name,
      abbreviation: country.abbreviation,
    });

    expect(mockedCountry.id).toEqual(country.id);
    expect(mockedCountry.name).toEqual(country.name);
    expect(mockedCountry.abbreviation).toEqual(country.abbreviation);
  });

  it('It should be able to list available countries', async () => {
    const country1 = new Country();

    country1.id = '4ee5a86c-a65e-456e-a839-c3374375cb6a';
    country1.name = 'testing';
    country1.abbreviation = 'ts';

    const country2 = new Country();

    country2.id = '4ee5a86c-a65e-456e-a839-c3374375cb6b';
    country2.name = 'testing2';
    country2.abbreviation = 'ts2';

    const countries = [country1, country2];

    find.mockReturnValue(Promise.resolve(countries));

    const mockedCountries = await countryService.list();

    expect(mockedCountries.length).toEqual(2);
    expect(mockedCountries[0]).toHaveProperty('name');
    expect(mockedCountries[0]).toHaveProperty('abbreviation');
    expect(mockedCountries[0].name).toEqual('testing');

    expect(mockedCountries[1]).toHaveProperty('name');
    expect(mockedCountries[1]).toHaveProperty('abbreviation');
    expect(mockedCountries[1].abbreviation).toEqual('ts2');
  });
});
