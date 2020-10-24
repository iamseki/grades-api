import { Module } from '@nestjs/common';
import { CollegeModule } from './modules/college/college.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './database/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(config), CollegeModule],
})
export class AppModule { }
