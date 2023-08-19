import { Module } from '@nestjs/common';
import { UtilsMikroOrmModule } from '@uber-popug/utils-mikro-orm';

import { Task } from '../model';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { HttpModule } from '@nestjs/axios';
import { TaskAgregateService } from './task.agregate';
import { ProfileModule } from '../profile/profile.module';
import { TaskProducerService } from './task.producer';
import { KafkaDirectProducer } from '@rsdk/kafka.producer.direct';
import {
  TaskComplitedEvent,
  TaskCreatedEvent,
  TaskReasignedEvent,
} from '@uber-popug/task.contract';
import {
  TaskComplitedEvent as TaskComplitedEventV2,
  TaskCreatedEvent as TaskCreatedEventV2,
  TaskReasignedEvent as TaskReasignedEventV2,
} from '@uber-popug/task.contract/dist/task.v2';
import { TaskControllerV2 } from './task-v2.controller';
import { TaskProducerServiceV2 } from './task.producer-V2';

const entities = [Task];

@Module({
  controllers: [TaskController, TaskControllerV2],
  imports: [
    UtilsMikroOrmModule.forRoot(entities),
    HttpModule,
    ProfileModule,
    KafkaDirectProducer.forEvent(TaskCreatedEvent),
    KafkaDirectProducer.forEvent(TaskReasignedEvent),
    KafkaDirectProducer.forEvent(TaskComplitedEvent),
    KafkaDirectProducer.forEvent(TaskCreatedEventV2),
    KafkaDirectProducer.forEvent(TaskReasignedEventV2),
    KafkaDirectProducer.forEvent(TaskComplitedEventV2),
  ],
  providers: [
    TaskService,
    TaskAgregateService,
    TaskProducerService,
    TaskProducerServiceV2,
  ],
  exports: [TaskService],
})
export class TaskModule {}
