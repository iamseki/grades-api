import { Controller, Post, Body, HttpCode } from "@nestjs/common";
import { CreateCountryDTO } from "../dtos/create-country.dto";
import { CountryService } from "../services/country.service";

@Controller('country')
export class CountryController {
  constructor(
    private readonly countryService: CountryService
  ) { }

  @HttpCode(201)
  @Post()
  async create(@Body() createDTO: CreateCountryDTO): Promise<void> {
    await this.countryService.create(createDTO)
  }
}