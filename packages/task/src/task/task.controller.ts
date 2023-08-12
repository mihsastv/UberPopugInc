import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from '../common/auth.guard';
import { TaskAgregateService } from './task.agregate';
import { User } from '../common/user.decorator';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly taskAgregateService: TaskAgregateService,
  ) {}

  @Get()
  task(@User() user: any) {
    return this.taskService.getTasks({ ...user });
  }

  @Post()
  addTask(@Body() body: { description: string }) {
    return this.taskAgregateService.creteTask(body.description);
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
