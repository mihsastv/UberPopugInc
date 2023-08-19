import { Injectable } from '@nestjs/common';
import { AccountAgregateService } from '../account/account.aggregate';
import { Cron } from '@nestjs/schedule';
import { TransactionJournalAggregateService } from '../transaction-journal/transaction-journal-aggregate.service';
import { PaymentCycleAggregateService } from '../payment-cycle/payment-cycle-aggregate.service';

@Injectable()
export class CronService {
  constructor(
    private accountService: AccountAgregateService,
    private transactionJournalAggregateService: TransactionJournalAggregateService,
    private paymentCycleAggregateService: PaymentCycleAggregateService,
  ) {}

  @Cron('00 00 * * *')
  async closeCycleWithPayment() {
    await this.paymentCycleAggregateService.closeCycleActiveCycle();

    const accountForPayment = await this.accountService.getPositivBalances();

    if (!accountForPayment) {
      return;
    }

    for (const account of accountForPayment) {
      this.transactionJournalAggregateService.createTransactionWithPayment(
        account,
      );
    }
  }
}
