import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() body: CreateUserDTO): Promise<User> {
    try {
      return this.userService.create(body.email, body.password);
    } catch (error) {
      return error;
    }
  }
}
