import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { LogService } from 'src/log/log.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private logService: LogService, // Inject log service
  ) {}

  async createUser(fullName: string, email: string, password: string): Promise<User> {
    const user = this.userRepository.create({ fullName, email, password });
    await this.userRepository.save(user);
    await this.logService.logAction('CREATE_USER', user.id);
    return user;
  }

  async updateUser(id: any, fullName: string, email: string): Promise<User> {
    const user = await this.userRepository.findOne(id);
    user.fullName = fullName;
    user.email = email;
    await this.userRepository.save(user);
    await this.logService.logAction('UPDATE_USER', user.id);
    return user;
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete(id);
    await this.logService.logAction('DELETE_USER', id);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}
