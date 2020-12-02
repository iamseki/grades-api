import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class CreateCollegeDTO {
  @IsOptional()
  @IsNotEmpty()
  countryId?: string;

  @IsOptional()
  @IsNotEmpty()
  countryName?: string;

  @IsOptional()
  @IsNotEmpty()
  countryAbbreviation?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  shortName: string;

  @IsNotEmpty()
  gradesSystem: string;

  @IsNotEmpty()
  @IsPositive()
  gradesAverage: number;
}
