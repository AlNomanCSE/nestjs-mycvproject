import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _script } from 'crypto';
import { promisify } from 'util';
const scrypt = promisify(_script);
@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.userService.find(email);
    console.log(users);

    if (users.length > 0) {
      console.log(
        '%cError: %cEmail in use',
        'color: red; font-weight: bold; font-size: 16px;',
        'color: orange; font-style: italic;',
      );
      throw new BadRequestException('Email in use');
    }
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const resultPassword = salt + '.' + hash.toString('hex');
    // nore creating a new user with this password
    const user = await this.userService.create(email, resultPassword);
    return user;
  }
}
