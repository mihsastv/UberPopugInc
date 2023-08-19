import { Injectable } from '@nestjs/common';
import { AccountService } from './account.service';

@Injectable()
export class AccountAgregateService {
  constructor(private accountService: AccountService) {}

  getAccountId(profileId: string) {
    return this.accountService.getAccount(profileId);
  }

  creditBalance(accountId: string, amount: number) {
    return this.accountService.creditBalance(accountId, amount);
  }

  debetBalance(accountId: string, amount: number) {
    return this.accountService.debetBalance(accountId, amount);
  }

  getCurrBalance(accountId: string) {
    return this.accountService.getCurrBalance(accountId);
  }

  getPositivBalances() {
    return this.accountService.getPositiveBalances();
  }
}
