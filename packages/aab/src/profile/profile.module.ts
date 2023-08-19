import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from '../model';
import { UtilsMikroOrmModule } from '@uber-popug/utils-mikro-orm';
import { ProfileController } from './profile.controller';
import { ProfileEventService } from './profile.event.service';

const entities = [Profile];

@Module({
  imports: [UtilsMikroOrmModule.forRoot(entities)],
  controllers: [ProfileController],
  providers: [ProfileService, ProfileEventService],
  exports: [ProfileService],
})
export class ProfileModule {}
