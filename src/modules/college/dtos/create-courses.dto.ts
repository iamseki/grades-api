import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';

export class CreateCoursesDTO {
  @IsNotEmpty()
  collegeId: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  shortName: string;

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => SubjectDTO)
  subjects: SubjectDTO[];
}

class SubjectDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  shortName: string;
}