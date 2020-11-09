import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StateService } from '../services/state.service';
import { State } from '../entities/state.entity';
import { HttpException } from '@nestjs/common';
import { Country } from '../entities/country.entity';

describe('State Service', () => {
  let stateService: StateService;
  let findOne: jest.Mock;
  
  beforeEach(async () => {
    findOne= jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateService,
        {
          provide: getRepositoryToken(State),
          useValue: { },
        },
        {
          provide: getRepositoryToken(Country),
          useValue: { findOne }
        }
      ],
    }).compile();

    stateService = module.get(StateService);
  });

  it('It should not be able to create a state without a country', async () => {
    await expect(stateService.createMany({
        states: [{
          abbreviation: 'BR',
          name: 'Brazil'
        }]
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });

  /* *************** IN FUTURE TRY AGAIN TO MOCK THE TRANSACTION !
  it('It should be able to create states', async () => {
    const country = new Country();
    country.name = 'Brazil';
    country.abbreviation = 'BR';

    findOne.mockReturnValue(Promise.resolve(country));
    //insertTransaction.mockImplementation(() => ({}));
    getConnection.mockReturnValue(Promise.resolve());
    insertTransaction.mockReturnValue(Promise.resolve());
    
    await expect(stateService.createMany({
      countryName: 'Brazil',
      states: [{
        abbreviation: 'BR',
        name: 'Brazil'
      }]
    }),
  ).rejects.not.toThrow();

  })
  */
});
