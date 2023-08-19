import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import {
  TASK_ASSIGN,
  TASK_COMPLITED,
  WITHDRAWAL,
  WITHDRAWALFAIL,
} from '../common/event.const';
import {
  BalanceAssigned,
  BalanceComplited,
  BalanceWithdlowl,
  BalanceWithdlowlFail,
} from './balance-journal.dto';
import { AccountAgregateService } from '../account/account.aggregate';
import { EntityManager } from '@mikro-orm/core';
import { BalanceJournal, PaymentType } from '../model';
import { PaymentCycleAggregateService } from '../payment-cycle/payment-cycle-aggregate.service';

@Injectable()
export class BalanceJournalService {
  constructor(
    private accountAgregateService: AccountAgregateService,
    private paymentCycleAggregateService: PaymentCycleAggregateService,
    private readonly em: EntityManager,
  ) {}

  @OnEvent(TASK_ASSIGN)
  async taskAssign(payload: BalanceAssigned) {
    this.accountAgregateService.creditBalance(
      payload.accountId,
      payload.credit,
    );

    const currCycle = await this.paymentCycleAggregateService.getCurrentCycle();

    const newBalanceRow = new BalanceJournal({
      cycleId: currCycle?.publicId || '0',
      accountId: payload.accountId,
      taskId: payload.taskId,
      debit: 0,
      credit: payload.credit,
      paymentType: PaymentType.ASSIGN,
    });

    this.em.persistAndFlush(newBalanceRow);
  }

  @OnEvent(TASK_COMPLITED)
  async taskComplited(payload: BalanceComplited) {
    this.accountAgregateService.creditBalance(payload.accountId, payload.debet);

    const currCycle = await this.paymentCycleAggregateService.getCurrentCycle();

    const newBalanceRow = new BalanceJournal({
      cycleId: currCycle?.publicId || '0',
      accountId: payload.accountId,
      taskId: payload.taskId,
      credit: 0,
      debit: payload.debet,
      paymentType: PaymentType.ASSIGN,
    });

    this.em.persistAndFlush(newBalanceRow);
  }

  @OnEvent(WITHDRAWAL)
  async taskWithdrowl(payload: BalanceWithdlowl) {
    const account = await this.accountAgregateService.getCurrBalance(
      payload.accountId,
    );

    if (!account || account.balanceAmount <= 0) {
      return;
    }

    const currCycle = await this.paymentCycleAggregateService.getCurrentCycle();

    const newBalanceRow = new BalanceJournal({
      cycleId: currCycle?.publicId || '0',
      accountId: payload.accountId,
      taskId: '0',
      debit: account.balanceAmount,
      credit: 0,
      paymentType: PaymentType.WITHDRAWAL,
    });

    this.em.persistAndFlush(newBalanceRow);

    account.balanceAmount = 0;
    this.em.flush();
  }

  @OnEvent(WITHDRAWALFAIL)
  async taskWithdrowlFail(payload: BalanceWithdlowlFail) {
    const account = await this.accountAgregateService.getCurrBalance(
      payload.accountId,
    );

    if (!account) {
      return;
    }

    const currCycle = await this.paymentCycleAggregateService.getCurrentCycle();

    const newBalanceRow = new BalanceJournal({
      cycleId: currCycle?.publicId || '0',
      accountId: payload.accountId,
      taskId: '0',
      debit: 0,
      credit: account.balanceAmount,
      paymentType: PaymentType.WITHDRAWALFAIL,
    });

    this.em.persistAndFlush(newBalanceRow);

    account.balanceAmount = 0;
    this.em.flush();
  }
}
