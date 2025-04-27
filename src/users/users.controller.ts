import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  Delete,
  Patch,
  Session,
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDTO } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDTO)
export class UsersController {
  constructor(
    private userService: UsersService,
    private autheService: AuthService,
  ) {}

  @Post('/signup')
 
  createUser(@Body() body: CreateUserDTO): Promise<User> {
    return this.autheService.signup(body.email, body.password);
  }

  @Post('/signin')

  signIn(@Body() body: CreateUserDTO): Promise<User> {
    return this.autheService.signin(body.email, body.password);
  }

  @Get('/colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    if (!session) {
      session = {};
    }
    session.color = color;
    return { color, message: `Color set to ${color}` };
  }

  @Get('/colors')
  getColor(@Session() session: any) {
    if (!session) {
      return { color: 'No session available' };
    }
    return { color: session.color || 'No color set' };
  }

  @Get('/:id')
  @Serialize(UserDTO)
  getUserInfo(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  @Get()
  @Serialize(UserDTO)
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
