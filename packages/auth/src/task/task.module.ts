import { Module } from '@nestjs/common';
import { UtilsMikroOrmModule } from '@vm/utils-mikro-orm';

import { Task } from '../model';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';

const entities = [Task];

@Module({
  controllers: [TaskController],
  imports: [UtilsMikroOrmModule.forRoot(entities)],
  providers: [TaskService],
})
export class TaskModule {}
