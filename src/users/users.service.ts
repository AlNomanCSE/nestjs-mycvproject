import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  async create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return await this.repo.save(user);
  }
  async findOne(id: number) {
    return await this.repo.findOne({
      where: { id },
    });
  }
  async find(email: string) {
    return this.repo.find({
      where: {
        email: email,
      },
    });
  }
}
