import { ConstraintViolationException, EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { Profile } from '../model';
import { CreateProfile } from './dto/create-profile.dto';
import { DeleteProfile } from './dto/delete-profile.dto';
import { UpdateProfile } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly em: EntityManager) {}

  public async get(): Promise<Profile[]> {
    const data = await this.em.find(Profile, {}, {});

    return data;
  }

  public async create(request: CreateProfile): Promise<boolean> {
    const account = new Profile({
      ...request,
    });

    return this.em
      .persistAndFlush(account)
      .then(() => true)
      .catch(() => false);
  }

  public async delete(request: DeleteProfile): Promise<boolean> {
    const account = await this.em.findOne(Profile, {
      public_id: request.public_id,
    });

    if (!account) {
      return false;
    }

    return this.em
      .removeAndFlush(account)
      .then(() => true)
      .catch(() => false);
  }

  public async update(request: UpdateProfile): Promise<boolean> {
    const profile = await this.em.findOne(Profile, {
      public_id: request.public_id,
    });

    if (!profile) {
      return false;
    }

    if (request.updateProfile.role) {
      console.log('Отправляем сообщение о изменении роли');
    }

    return this.em
      .nativeUpdate(
        Profile,
        { public_id: request.public_id },
        request.updateProfile,
      )
      .then(() => true)
      .catch(() => false);
  }

  async findOne(login: string): Promise<Profile | undefined> {
    return this.em.findOne(Profile, { login });
  }
}
