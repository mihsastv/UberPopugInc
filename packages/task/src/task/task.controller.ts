import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from '../common/auth.guard';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  task() {
    return { rr: 'dddddd' };
  }
}
