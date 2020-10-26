import { IsNotEmpty, IsOptional, Length, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStatesDTO {
  @IsOptional()
  @IsNotEmpty()
  countryId: string;

  @IsOptional()
  @IsNotEmpty()
  countryName: string;

  @IsOptional()
  @IsNotEmpty()
  countryAbbreviation: string;

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => StateDTO)
  states: StateDTO[];
}

class StateDTO {
  @IsNotEmpty()
  name: string;

  @Length(2, 2)
  @IsNotEmpty()
  abbreviation: string;
}
