import { Module } from '@nestjs/common';
import { CollegeModule } from './college/college.module';
import { MongooseModule } from '@nestjs/mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/grades';

@Module({
  imports: [MongooseModule.forRoot(MONGO_URI), CollegeModule],
})
export class AppModule { }
