import { Module } from '@nestjs/common';
import { UtilsMikroOrmModule } from '@uber-popug/utils-mikro-orm';

import { Task } from '../model';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { HttpModule } from '@nestjs/axios';

const entities = [Task];

@Module({
  controllers: [TaskController],
  imports: [UtilsMikroOrmModule.forRoot(entities), HttpModule],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
