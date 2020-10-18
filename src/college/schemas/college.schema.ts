import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class College extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  // Needs to implement the relationship between College and Course Schemas
  @Prop({ required: true })
  courses: string[];

  @Prop({ required: true })
  grades_system: string;

  @Prop({ required: true })
  grades_average: number;
}

export const CollegeSchema = SchemaFactory.createForClass(College);