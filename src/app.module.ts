import { Module } from '@nestjs/common';
import { CollegeModule } from './modules/college/college.module';
import { LocaleModule } from './modules/locale/locale.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ormconfig from './database/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), CollegeModule, LocaleModule],
})
export class AppModule {}
