import { Body, Controller, HttpCode,Post } from '@nestjs/common';
import { CreateCollegeDTO } from '../dtos/create-college.dto';
import { CollegeService } from '../services/college.service';

@Controller('college')
export class CollegeController {
  constructor(private readonly collegeService: CollegeService ) {}

  @HttpCode(201)
  @Post()
  async create(@Body() createDTO: CreateCollegeDTO):Promise<void> {
    await this.collegeService.create(createDTO);
  }
}
