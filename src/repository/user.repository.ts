import { EntityRepository, Repository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { User } from '../entities';
import { v4 as uuid4 } from 'uuid';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');

  async addUser(user: Partial<User>): Promise<User> {
    try {
      this.logger.log(`create user record for ${user}`);
      return await this.save({ id: uuid4(), ...user });
    } catch (error) {
      this.logger.error(
        `Error creating merchant for ${user.firstName}: ${JSON.stringify(
          error,
        )}`,
      );
      throw error;
    }
  }

  async findUser(userInput: Partial<User>): Promise<User> {
    const queryBuilder = await this.createQueryBuilder().where(userInput);
    const user = await queryBuilder.getOne();
    return user;
  }
}
