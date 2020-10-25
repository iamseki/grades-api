import { Module } from '@nestjs/common';
import { Country } from './entities/country.entity';
import { State } from './entities/state.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryController } from './controllers/country.controller';
import { CountryService } from './services/country.service';

@Module({
  imports: [TypeOrmModule.forFeature([Country, State])],
  providers: [CountryService],
  controllers: [CountryController]
})
export class LocaleModule { }
