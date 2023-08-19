import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../common/auth.guard';
import { TaskAgregateService } from './task.agregate';
import { Task } from '../model';
import { CreateTaskV2Dto } from './task.dto';
import { User } from '../common/user.decorator';
import { TaskService } from './task.service';

@UseGuards(AuthGuard)
@Controller('task_v2')
export class TaskControllerV2 {
  constructor(
    private readonly taskService: TaskService,
    private readonly taskAgregateService: TaskAgregateService,
  ) {}

  @Get()
  tasks(@User() user: any): Promise<Task[]> {
    return this.taskService.getTasks({ ...user });
  }

  @Post()
  addTask(@Body() body: CreateTaskV2Dto): Promise<Task> {
    return this.taskAgregateService.creteTask(body);
  }

  @Patch()
  reasignTasks() {
    this.taskAgregateService.reassignTasks();
  }

  @Put()
  taskComplited(@Body() body: { taskId: string }) {
    return this.taskAgregateService.taskComplited(body.taskId);
  }
}
