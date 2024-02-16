/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../service';
import { AuthJwtTokenBuilder } from './jwt.builder';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: AuthJwtTokenBuilder,
  ) {}

  async validateUser(userName: string, pass: string): Promise<any> {
    const user = await this.userService.findOne({ userName });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const access_token = this.jwtService.generateToken(
      `${user.firstName} ${user.lastName}`,
    );
    return {
      access_token,
    };
  }
}
