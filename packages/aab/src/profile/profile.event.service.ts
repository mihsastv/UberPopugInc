import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import {
  ProfileCreatedEvent,
  ProfileUpdatedEvent,
  ProfileDeletedEvent,
} from '@uber-popug/profile.contract';
import { Profile } from '../model';

@Injectable()
export class ProfileEventService {
  constructor(private readonly em: EntityManager) {}

  createProfile(payload: ProfileCreatedEvent): void {
    const newProfile = new Profile(payload);

    this.em.persistAndFlush(newProfile);
  }

  async updateProfile(payload: ProfileUpdatedEvent): Promise<void> {
    const profile = await this.em.findOne(Profile, {
      publicId: payload.publicId,
    });

    if (profile) {
      profile.role = payload.role;
      profile.login = payload.login;
    }

    this.em.flush();
  }

  async deleteProfile(payload: ProfileDeletedEvent): Promise<void> {
    const profile = await this.em.findOne(Profile, {
      publicId: payload.publicId,
    });

    if (profile) {
      profile.deleted = true;
    }

    this.em.flush();
  }
}
