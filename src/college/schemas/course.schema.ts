import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Course extends Document {
  // Needs to implement the relationship between College and Course Schemas
  @Prop({ required: true })
  college_id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  short_name: string;

  @Prop({ required: true })
  duration: number;

  // Needs to implement the relationship between Course and Subject Schemas
  @Prop({ required: true })
  subjects: string[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);