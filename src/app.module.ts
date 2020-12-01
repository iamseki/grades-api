import { Module } from '@nestjs/common';
import { CollegeModule } from './modules/college/college.module';
import { LocaleModule } from './modules/locale/locale.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import * as ormconfig from './config/typeorm';
import { AppController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), CollegeModule, LocaleModule, AuthModule],
  controllers: [AppController],
})
export class AppModule {}
