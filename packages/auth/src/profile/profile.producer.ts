import { Injectable } from '@nestjs/common';
import { InjectProducer, KafkaProducer } from '@rsdk/kafka.producer';
import {
  ProfileCreatedEvent,
  ProfileDeletedEvent,
  ProfileUpdatedEvent,
  ProfileRoleUpdatedRole,
} from '@uber-popug/profile.contract';
import { Profile } from '../model';
import { Role } from '@uber-popug/profile.contract';

@Injectable()
export class ProfileProducerService {
  constructor(
    @InjectProducer(ProfileCreatedEvent)
    private profileCreatedEvent: KafkaProducer<ProfileCreatedEvent>,
    @InjectProducer(ProfileUpdatedEvent)
    private profileUpdatedEvent: KafkaProducer<ProfileUpdatedEvent>,
    @InjectProducer(ProfileDeletedEvent)
    private profileDeletedEvent: KafkaProducer<ProfileDeletedEvent>,
    @InjectProducer(ProfileRoleUpdatedRole)
    private profileRoleUpdatedRole: KafkaProducer<ProfileRoleUpdatedRole>,
  ) {}

  createProfileEvent(profile: Profile) {
    this.profileCreatedEvent.publish(profile);
  }

  updateProfileEvent(profile: Profile) {
    this.profileUpdatedEvent.publish(profile);
  }

  deleteProfileEvent(profileId: string) {
    this.profileDeletedEvent.publish({ publicId: profileId });
  }

  updateProfileRoleEvent(props: { publicId: string; role: Role }) {
    this.profileRoleUpdatedRole.publish(props);
  }
}
