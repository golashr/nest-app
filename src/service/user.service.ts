import { Injectable, Logger } from '@nestjs/common'; //Inject
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from '@nestjs/class-transformer';
import { UserTransformer } from './class-transformer';
import { User } from '../entities';
import { UserRepository } from '../repository';

@Injectable()
export class UserService {
  logger = new Logger('UserService');
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async addUser(user: Partial<User>): Promise<User> {
    this.logger.log(`userName addUser ${user.userName!}`);
    return await this.userRepository.save(user);
  }

  getHello(): string {
    return 'Hello World!';
  }

  private serialized = (user: User) => {
    const abcd = plainToClass(UserTransformer, user);
    this.logger.log(`From serialised ${JSON.stringify(abcd)}`);
    return abcd;
  };

  async findOne(userInput: Partial<User>): Promise<User> {
    this.logger.log(`userName findOne ${JSON.stringify(userInput)}`);
    try {
      const user = await this.userRepository.findUser(userInput);
      return user;
    } catch (err) {
      console.error(err);
    }
  }
}
