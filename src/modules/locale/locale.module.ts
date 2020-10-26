import { Module } from '@nestjs/common';
import { Country } from './entities/country.entity';
import { State } from './entities/state.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryController } from './controllers/country.controller';
import { StateController } from './controllers/state.controller';
import { CountryService } from './services/country.service';
import { StateService } from './services/state.service';

@Module({
  imports: [TypeOrmModule.forFeature([Country, State])],
  providers: [CountryService, StateService],
  controllers: [CountryController, StateController]
})
export class LocaleModule { }
