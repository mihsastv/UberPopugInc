import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

import { Profile } from '../model';

@Injectable()
export class ProfileService {
  constructor(private readonly em: EntityManager) {}

  public async get(): Promise<> {
    const data = await this.em.find(Profile, {}, {});

    return { success: true, data };
  }

  public async create(
    request: CreateProfileRequest,
  ): Promise<CreateProfileResponse> {
    const account = new Profile({
      ...request,
    });

    await this.em.persistAndFlush(account);
    return { success: true, data: account };
  }

  public async delete(
    request: DeleteProfileRequest,
  ): Promise<DeleteProfileResponse> {
    const account = await this.em.findOne(Profile, { id: request.id });

    if (!account) {
      return {
        success: false,
        data: request,
        error: `Profile ${request.id} not found`,
      };
    }

    await this.em.removeAndFlush(account);
    return { success: true, data: request };
  }

  public async update(
    request: UpdateProfileRequest,
  ): Promise<UpdateProfileResponse> {
    const profile = await this.em.findOne(Profile, { id: request.id });
    const profileUPdate = { ...request } as SanitazeUpdateProfileReqest;

    if (!profile) {
      return {
        success: false,
        data: request,
        error: `Profile ${request.id} not found`,
      };
    }

    const id = request.id;

    await this.em.nativeUpdate(Profile, { id }, profileUPdate);
    return { success: true, data: request };
  }
}
