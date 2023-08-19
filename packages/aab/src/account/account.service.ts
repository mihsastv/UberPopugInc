import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Account } from '../model';

@Injectable()
export class AccountService {
  constructor(private readonly em: EntityManager) {}

  getAccount(profileId: string) {
    return this.em.findOne(Account, { profileId });
  }

  async creditBalance(accountId: string, amount: number) {
    const acc = await this.em.findOne(Account, { publicId: accountId });

    if (!acc) {
      return;
    }

    acc.balanceAmount += amount;
  }

  async debetBalance(accountId: string, amount: number) {
    const acc = await this.em.findOne(Account, { publicId: accountId });

    if (!acc) {
      return;
    }

    acc.balanceAmount += amount;
  }

  async getCurrBalance(accountId: string) {
    const acc = await this.em.findOne(Account, { publicId: accountId });

    return acc;
  }

  async getPositiveBalances() {
    return this.em.find(Account, { balanceAmount: { $gt: 0 } });
  }
}
