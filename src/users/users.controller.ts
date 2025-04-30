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
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDTO } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';

interface SessionData {
  userId?: number;
}

@Controller('auth')
export class UsersController {
  constructor(
    private userService: UsersService,
    private autheService: AuthService,
  ) {}

  @Post('/signup')
  @Serialize(UserDTO)
  createUser(@Body() body: CreateUserDTO): Promise<User> {
    return this.autheService.signup(body.email, body.password);
  }

  @Post('/signin')
  @Serialize(UserDTO)
  async signIn(@Body() body: CreateUserDTO, @Session() session: SessionData) {
    const user = await this.autheService.signin(body.email, body.password);

    if (!user.userId || isNaN(user.userId)) {
      throw new NotFoundException('User not found');
    }
    if (!session) {
      session = {} as SessionData;
    }
    session.userId = Number(user.userId);
    return user;
  }
  @Post('/signout')
  signOut(@Session() session: SessionData) {
    if (session && session.userId) {
      session.userId = undefined;
      return { message: 'Successfully signed out' };
    }
    return { message: 'No active session to sign out from' };
  }
  // @Get('/whoami')
  // @Serialize(UserDTO)
  // async whoAmI(@Session() session: SessionData) {
  //   console.log('Whoami - Session:', session);

  //   if (!session || !session.userId) {
  //     throw new NotFoundException('No user logged in');
  //   }

  //   try {
  //     const user = await this.userService.findOne(session.userId);
  //     if (!user) {
  //       throw new NotFoundException('User not found');
  //     }
  //     return user;
  //   } catch (error) {
  //     console.error('Error in whoami:', error);
  //     if (error instanceof NotFoundException) {
  //       throw error;
  //     }
  //     throw new InternalServerErrorException('Failed to retrieve user');
  //   }
  // }
  @Get('/whoami')
  async whoAmI(@CurrentUser() user: User) {
    return user;
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
