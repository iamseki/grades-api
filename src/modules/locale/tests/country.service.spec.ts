import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CountryService } from '../services/country.service';
import { Country } from '../entities/country.entity';
import { HttpException } from '@nestjs/common';

describe('Country Service', () => {
  let countryService: CountryService;
  let findOne: jest.Mock;
  let save: jest.Mock;

  beforeEach(async () => {
    findOne = jest.fn();
    save = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [CountryService, {
        provide: getRepositoryToken(Country), useValue: { findOne, save },
      }],
    }).compile();

    countryService = module.get(CountryService);
  });

  it('It should not be able to create a country that name already exists', async () => {

    const country = new Country();

    country.name = "testing";
    country.abbreviation = "ts";

    findOne.mockReturnValue(Promise.resolve(country))

    await expect(
      countryService.create({ name: country.name, abbreviation: country.abbreviation }),
    ).rejects.toBeInstanceOf(HttpException);

  });

  it('It should not be able to create a country that abbreviation already exists', async () => {

    const country = new Country();

    country.name = "testing";
    country.abbreviation = "ts";

    findOne.mockReturnValue(Promise.resolve(undefined)) // the first findOne must be undefined cause name doesn't exists yet
    findOne.mockReturnValue(Promise.resolve(country))

    await expect(
      countryService.create({ name: "testingggg", abbreviation: country.abbreviation }),
    ).rejects.toBeInstanceOf(HttpException);

  });

  it('It should be able to create a country', async () => {

    const country = new Country();

    country.id = "4ee5a86c-a65e-456e-a839-c3374375cb6a"
    country.name = "testing";
    country.abbreviation = "ts";

    findOne.mockReturnValue(Promise.resolve(undefined))
    save.mockReturnValue(Promise.resolve(country))

    const mockedCountry = await countryService.create({ name: country.name, abbreviation: country.abbreviation })

    expect(mockedCountry.id).toEqual(country.id)
    expect(mockedCountry.name).toEqual(country.name)
    expect(mockedCountry.abbreviation).toEqual(country.abbreviation)
  });

});