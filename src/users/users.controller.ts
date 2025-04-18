import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  Delete,
  Patch,

} from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDTO } from './dtos/user.dto';

@Serialize(UserDTO)
@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}
  
  @Post('/signup')
  createUser(@Body() body: CreateUserDTO): Promise<User> {
    return this.userService.create(body.email, body.password);
  }
  

  @Get('/:id')
  getUserInfo(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }
  
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }
  
  @Delete('/:id')
  removeUserById(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    return this.userService.update(parseInt(id), body);
  }
}