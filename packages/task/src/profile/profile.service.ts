import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Profile } from '../model';
import { Role as RoleEnum } from '@uber-popug/profile.contract';

@Injectable()
export class ProfileService {
  constructor(private readonly em: EntityManager) {}

  async getRandomPopug(): Promise<string> {
    const popugCount = await this.em.count(Profile, {
      role: [RoleEnum.ROLE_USER, RoleEnum.ROLE_MAIN_USER],
    });
    const popogRandomIndex = this.getRandomIndex(popugCount);

    const [popug] = await this.em.find(
      Profile,
      { role: [RoleEnum.ROLE_USER, RoleEnum.ROLE_MAIN_USER] },
      { offset: popogRandomIndex, limit: 1 },
    );

    return popug.publicId;
  }

  private getRandomIndex(max: number): number {
    return Math.floor(Math.random() * (0 - max + 1) + 0);
  }
}
