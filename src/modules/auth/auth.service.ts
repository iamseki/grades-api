import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from './dtos/auth-dto';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<AuthDTO> {
    const user: AuthDTO = {
      id: 'testing' + pass,
      username,
    };

    return username === process.env.ROOT_USER && pass === process.env.ROOT_PASS ? user : null;
  }

  async login(user: AuthDTO) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
