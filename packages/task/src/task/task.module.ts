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

const entities = [Task];

@Module({
  controllers: [TaskController],
  imports: [
    UtilsMikroOrmModule.forRoot(entities),
    HttpModule,
    ProfileModule,
    KafkaDirectProducer.forEvent(TaskCreatedEvent),
    KafkaDirectProducer.forEvent(TaskReasignedEvent),
    KafkaDirectProducer.forEvent(TaskComplitedEvent),
  ],
  providers: [TaskService, TaskAgregateService, TaskProducerService],
  exports: [TaskService],
})
export class TaskModule {}
