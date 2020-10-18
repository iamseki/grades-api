import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Subject extends Document {
  // Needs to implement the relationship between Course and Subject Schemas
  @Prop({ required: true })
  course_id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  short_name: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  semester: number;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);