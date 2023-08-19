import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { WITHDRAWAL, WITHDRAWALFAIL } from '../common/event.const';
import {
  BalanceWithdlowl,
  BalanceWithdlowlFail,
} from '../balance-journal/balance-journal.dto';
import { Account, TransactionJournal, TransactionStatus } from '../model';
import { AccountAgregateService } from '../account/account.aggregate';
import { TransactionJournalService } from './transaction-journal.service';

@Injectable()
export class TransactionJournalAggregateService {
  constructor(
    private accountAgregateService: AccountAgregateService,
    private transactionJournalService: TransactionJournalService,
    private eventEmitter: EventEmitter2,
  ) {}

  async createTransactionWithPayment(account: Account) {
    const newTransaction = new TransactionJournal({
      profileId: account.profileId,
      balance: account.balanceAmount,
    });

    await this.transactionJournalService.createTransaction(newTransaction);

    await this.accountAgregateService.creditBalance(
      account.publicId,
      account.balanceAmount,
    );

    this.eventEmitter.emit(
      WITHDRAWAL,
      new BalanceWithdlowl({
        accountId: account.profileId,
      }),
    );
    this.paymentServiceAndMail(account, newTransaction);
  }

  // внешний сервис который должен сделать выплату
  paymentServiceAndMail(account: Account, newTransaction: TransactionJournal) {
    // имитируем то оплату то неоплату
    if (new Date().getMinutes() % 2 === 0) {
      this.paymentSuccess(account, newTransaction);
    } else {
      this.paymentFalse(account, newTransaction);
    }
  }

  // Сервис совершил выплату
  paymentSuccess(account: Account, newTransaction: TransactionJournal) {
    this.transactionJournalService.updateStatatusTransaction({
      publicId: newTransaction.publicId,
      status: TransactionStatus.SUCCESS,
    });
  }

  // оплата не прошла
  paymentFalse(account: Account, newTransaction: TransactionJournal) {
    this.transactionJournalService.updateStatatusTransaction({
      publicId: newTransaction.publicId,
      status: TransactionStatus.FAIL,
    });
    this.eventEmitter.emit(
      WITHDRAWALFAIL,
      new BalanceWithdlowlFail({
        accountId: account.profileId,
        amount: account.balanceAmount,
      }),
    );
  }
}
