import { IsNotEmpty, Length } from 'class-validator';

export class CreateCountryDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Length(2, 2)
  abbreviation: string;
}
