import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { UsersModule } from '../';

@Module({
  imports: [],
  providers: [AuthService],
})
export class AuthModule {}
