import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.userService.find(email);
    if (users) {
      console.log(
        '%cError: %cEmail in use',
        'color: red; font-weight: bold; font-size: 16px;',
        'color: orange; font-style: italic;',
      );
      throw new BadRequestException('Email in use');
    }
  }
}
