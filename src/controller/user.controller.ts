import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto';
import { User } from '../entities';
import { CustomLogger } from '../modules/logger';
import {
  ThrottlerBehindProxyGuard,
  EmailThrottlerBehindProxyGuard,
  ThrottleByEmail,
} from '../guards';
// import { ValidationPipe } from '../pipes';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logger: CustomLogger,
  ) {
    this.logger.setContext('UserController');
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async find(@Body() user: Partial<User>): Promise<User> {
    this.logger.log(`find() ${JSON.stringify(user)}`);
    return await this.userService.findOne(user);
  }

  @UseGuards(ThrottlerBehindProxyGuard)
  @UseGuards(EmailThrottlerBehindProxyGuard)
  @ThrottleByEmail(10, 60)
  @Post()
  //this validation pipe is applied only to this route if it is not added in the app as global pipe
  async create(@Body() createUserDto: CreateUserDto) {
    // The `createUserDto` object has already been validated by NestJS
    // and contains only the properties defined in the `CreateUserDto` class.
    // You can use it to create a new user in your application.

    this.logger.log(`createUserDto  ${JSON.stringify(createUserDto)}`);
    return await this.userService.addUser(createUserDto);
  }
}
