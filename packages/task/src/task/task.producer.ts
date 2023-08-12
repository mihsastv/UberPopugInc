import { Injectable } from '@nestjs/common';
import {
  TaskComplitedEvent,
  TaskCreatedEvent,
  TaskReasignedEvent,
} from '@uber-popug/task.contract';
import { InjectProducer, KafkaProducer } from '@rsdk/kafka.producer';
import { Task } from '../model';

@Injectable()
export class TaskProducerService {
  constructor(
    @InjectProducer(TaskCreatedEvent)
    private taskCreatedEvent: KafkaProducer<TaskCreatedEvent>,
    @InjectProducer(TaskReasignedEvent)
    private taskReasignedEvent: KafkaProducer<TaskReasignedEvent>,
    @InjectProducer(TaskComplitedEvent)
    private taskComplitedEvent: KafkaProducer<TaskComplitedEvent>,
  ) {}

  taskCreated(task: Task) {
    this.taskCreatedEvent.publish(task);
  }

  taskReasigned(props: TaskReasignedEvent) {
    this.taskReasignedEvent.publish(props);
  }

  taskComplited(props: TaskComplitedEvent) {
    this.taskComplitedEvent.publish(props);
  }
}
