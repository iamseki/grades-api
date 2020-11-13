import { Controller, Post, Body, HttpCode, Get, UseGuards } from '@nestjs/common';
import { CreateCountryDTO } from '../dtos/create-country.dto';
import { CountryService } from '../services/country.service';
import { Country } from '../entities/country.entity';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @HttpCode(201)
  @Post()
  async create(@Body() createDTO: CreateCountryDTO): Promise<void> {
    await this.countryService.create(createDTO);
  }

  @Get()
  async read(): Promise<Country[]> {
    const countries = await this.countryService.list();
    return countries;
  }
}
