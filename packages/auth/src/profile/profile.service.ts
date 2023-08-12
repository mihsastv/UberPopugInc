import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { Profile } from '../model';
import { CreateProfile } from './dto/create-profile.dto';
import { DeleteProfile } from './dto/delete-profile.dto';
import { UpdateProfile } from './dto/update-profile.dto';
import { ProfileProducerService } from './profile.producer';

@Injectable()
export class ProfileService {
  constructor(
    private readonly em: EntityManager,
    private readonly profileProducerService: ProfileProducerService,
  ) {}

  public async get(): Promise<Profile[]> {
    const data = await this.em.find(Profile, {}, {});

    return data;
  }

  public async create(request: CreateProfile): Promise<boolean> {
    const profile = new Profile({
      ...request,
    });

    return this.em
      .persistAndFlush(profile)
      .then(() => {
        this.profileProducerService.createProfileEvent(profile);
        return true;
      })
      .catch(() => false);
  }

  public async delete(request: DeleteProfile): Promise<boolean> {
    const account = await this.em.findOne(Profile, {
      publicId: request.publicId,
    });

    if (!account) {
      return false;
    }

    return this.em
      .removeAndFlush(account)
      .then(() => {
        this.profileProducerService.deleteProfileEvent(request.publicId);
        return true;
      })
      .catch(() => false);
  }

  public async update(request: UpdateProfile): Promise<boolean> {
    const profile = await this.em.findOne(Profile, {
      publicId: request.public_id,
    });

    if (!profile) {
      return false;
    }

    if (
      request.updateProfile.role &&
      request.updateProfile.role !== profile.role
    ) {
      this.profileProducerService.updateProfileRoleEvent({
        publicId: profile.publicId,
        role: request.updateProfile.role,
      });
    }

    return this.em
      .nativeUpdate(
        Profile,
        { publicId: request.public_id },
        request.updateProfile,
      )
      .then(() => {
        this.profileProducerService.updateProfileEvent(profile);
        return true;
      })
      .catch(() => false);
  }

  async findOne(login: string): Promise<Profile | null> {
    return this.em.findOne(Profile, { login });
  }
}
