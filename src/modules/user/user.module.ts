import { DataSource } from 'typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../../service';
import { User } from '../../entities';
import { UserController } from '../../controller';
import { UserRepository } from '../../repository';
import { LoggerModule } from '../logger';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([User])],
  providers: [
    UserService,
    {
      provide: UserRepository,
      useFactory: (dataSource: DataSource) =>
        new UserRepository(User, dataSource.createEntityManager()),
      inject: [DataSource],
    },
  ],
  controllers: [UserController],
  exports: [UserService, UserRepository],
})
export class UserModule {}
