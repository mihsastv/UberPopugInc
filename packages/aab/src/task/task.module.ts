import { Module } from '@nestjs/common';
import { Profile } from '../model';
import { UtilsMikroOrmModule } from '@uber-popug/utils-mikro-orm';
import { TaskEventService } from './task.event.service';
import { AccountModule } from '../account/account.module';

const entities = [Profile];

@Module({
  imports: [UtilsMikroOrmModule.forRoot(entities), AccountModule],
  providers: [TaskEventService],
})
export class TaskModule {}
