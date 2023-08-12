import { Module } from '@nestjs/common';
import { UtilsMikroOrmModule } from '@uber-popug/utils-mikro-orm';

import { Profile } from '../model';

import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { KafkaDirectProducer } from '@rsdk/kafka.producer.direct';
import {
  ProfileCreatedEvent,
  ProfileDeletedEvent,
  ProfileUpdatedEvent,
  ProfileRoleUpdatedRole,
} from '@uber-popug/profile.contract';
import { ProfileProducerService } from './profile.producer';

const entities = [Profile];

@Module({
  controllers: [ProfileController],
  imports: [
    UtilsMikroOrmModule.forRoot(entities),
    KafkaDirectProducer.forEvent(ProfileCreatedEvent),
    KafkaDirectProducer.forEvent(ProfileUpdatedEvent),
    KafkaDirectProducer.forEvent(ProfileRoleUpdatedRole),
    KafkaDirectProducer.forEvent(ProfileDeletedEvent),
  ],
  providers: [ProfileService, ProfileProducerService],
  exports: [ProfileService],
})
export class ProfileModule {}
