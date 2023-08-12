import { Module } from '@nestjs/common';
import { UtilsMikroOrmModule } from '@uber-popug/utils-mikro-orm';

import { Profile } from '../model';

import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

const entities = [Profile];

@Module({
  controllers: [ProfileController],
  imports: [UtilsMikroOrmModule.forRoot(entities)],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
