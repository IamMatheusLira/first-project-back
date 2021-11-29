import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findOne(loginDto.email);
    const authorized = await bcrypt.compare(loginDto.password, user.password);
    if (user && authorized) {
      return this.generateAuth(user);
    }
    return {
      authorized: false,
      token: null,
      user: null,
    };
  }

  async verifyJwt(id: number) {
    const user = await this.usersService.findById(id);
    return this.generateAuth(user);
  }

  generateAuth(user: any) {
    const payload = { email: user.email, id: user.id };
    const { password, phone, created_at, updated_at, ...result } = user;
    return {
      authorized: true,
      token: this.jwtService.sign(payload),
      user: result,
    };
  }
}
