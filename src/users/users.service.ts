import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findAll() {
    return this.usersRepository.find({select: ['id', 'name', 'email', 'phone']});
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.findOne(createUserDto.email);
    if (user) throw new HttpException(
      'Já existe um usuario cadastrado com esse e-mail',
      HttpStatus.BAD_REQUEST,
    );
    return this.usersRepository.create(createUserDto).save();
  }

  findOne(email: string) {
    return this.usersRepository.findOne({ email });
  }

  findById(id: number) {
    return this.usersRepository.findOne({ id });
  }
}
