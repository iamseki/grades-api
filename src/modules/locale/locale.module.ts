import { Module } from '@nestjs/common';
import { Country } from './entities/country.entity';
import { State } from './entities/state.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Country, State])]
})
export class LocaleModule { }
