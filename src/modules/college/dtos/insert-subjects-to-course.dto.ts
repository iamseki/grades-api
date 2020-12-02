import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsPositive, ValidateNested } from 'class-validator';

export class InsertSubjectsIntoCourseDTO {
  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => SubjectDTO)
  subjects: SubjectDTO[];
}

class SubjectDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsPositive()
  semester: number;
}
