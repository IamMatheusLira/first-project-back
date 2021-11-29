import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class LoginUserDto extends PartialType(CreateUserDto) {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;
}
