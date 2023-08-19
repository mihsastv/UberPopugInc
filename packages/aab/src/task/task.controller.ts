import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { Consume } from '@rsdk/kafka.transport';
import { TaskEventService } from './task.event.service';
import {
  TaskCreatedEvent,
  TaskReasignedEvent,
  TaskComplitedEvent,
} from '@uber-popug/task.contract/dist/task.v2';

@Controller()
export class TaskController {
  constructor(private readonly taskEventService: TaskEventService) {}

  @Consume(TaskCreatedEvent)
  async taskCreatedEvent(@Payload() payload: TaskCreatedEvent): Promise<void> {
    this.taskEventService.createdTask(payload);
  }

  @Consume(TaskReasignedEvent)
  async taskReasignedEvent(
    @Payload() payload: TaskReasignedEvent,
  ): Promise<void> {
    this.taskEventService.reassignedTask(payload);
  }

  @Consume(TaskComplitedEvent)
  async taskComplitedEvent(
    @Payload() payload: TaskComplitedEvent,
  ): Promise<void> {
    this.taskEventService.complitedTask(payload);
  }
}
