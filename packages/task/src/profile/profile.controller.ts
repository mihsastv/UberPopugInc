import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { Consume } from '@rsdk/kafka.transport';
import {
  ProfileCreatedEvent,
  ProfileDeletedEvent,
  ProfileUpdatedEvent,
} from '@uber-popug/profile.contract';
import { ProfileEventService } from './profile.event.service';

@Controller()
export class ProfileController {
  constructor(private readonly profileEventService: ProfileEventService) {}

  @Consume(ProfileCreatedEvent)
  async handleProfileCreateEvent(
    @Payload() payload: ProfileCreatedEvent,
  ): Promise<void> {
    this.profileEventService.createProfile(payload);
  }

  @Consume(ProfileUpdatedEvent)
  async handleProfileUpdateEvent(
    @Payload() payload: ProfileUpdatedEvent,
  ): Promise<void> {
    this.profileEventService.updateProfile(payload);
  }

  @Consume(ProfileDeletedEvent)
  async handleProfileDeleteEvent(
    @Payload() payload: ProfileDeletedEvent,
  ): Promise<void> {
    this.profileEventService.deleteProfile(payload);
  }
}
