import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from './log.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}

  async logAction(action: string, userId: number): Promise<void> {
    const log = this.logRepository.create({ action, userId });
    await this.logRepository.save(log);
  }
}
