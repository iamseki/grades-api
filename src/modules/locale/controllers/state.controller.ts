import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import { StateService } from '../services/state.service';
import { CreateStatesDTO } from '../dtos/create-states.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @HttpCode(201)
  @Post()
  async create(@Body() createDTO: CreateStatesDTO): Promise<void> {
    await this.stateService.createMany(createDTO);
  }
}
