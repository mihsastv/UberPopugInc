import { Injectable } from '@nestjs/common';
import { BalanceJournal, PaymentCycle, Task } from '../model';
import { EntityManager } from '@mikro-orm/core';
import { TaskStatus } from '@uber-popug/task.contract';

@Injectable()
export class AnalyticService {
  constructor(private em: EntityManager) {}

  async getTopReport(date: Date) {
    const cycle = await this.em.findOne(PaymentCycle, { beginDate: date });
    if (!cycle) {
      return {};
    }

    const balanceCredir = await this.em.find(BalanceJournal, {
      cycleId: cycle.publicId,
    });

    if (!balanceCredir) {
      return {};
    }

    let result = 0;

    for (const el of balanceCredir) {
      result += el.credit;
      result += el.debit;
    }

    return result * -1;
  }

  async getPopugReport(cycleId: string, popugId: string) {
    const cycle = await this.em.findOne(PaymentCycle, { publicId: cycleId });
    if (!cycle) {
      return {};
    }

    const balanceCredir = await this.em.find(BalanceJournal, {
      cycleId: cycle.publicId,
      accountId: popugId,
    });

    return balanceCredir;
  }

  async getTopTask(cycleId: string, dataStart: Date, dateEnd: Date) {
    const task = await this.em.find(Task, {
      $and: [
        {
          $or: [
            { createdAt: { $gt: dataStart } },
            { createdAt: { $lt: dateEnd } },
          ],
        },
        { status: TaskStatus.TASK_STATUS_COMPLITED },
      ],
    });

    if (!task) {
      return 0;
    }

    let res = 0;
    for (const el of task) {
      if (res < el.complitedPrice) {
        res = el.complitedPrice;
      }
    }

    return res;
  }

  async getBalanceDay(popugId: string, date: Date) {
    const cycle = await this.em.findOne(PaymentCycle, { beginDate: date });
    if (!cycle) {
      return {};
    }

    const balanceCredir = await this.em.find(BalanceJournal, {
      cycleId: cycle.publicId,
      accountId: popugId,
    });

    if (!balanceCredir) {
      return {};
    }

    let result = 0;

    for (const el of balanceCredir) {
      result += el.credit;
      result -= el.debit;
    }

    return result;
  }
}
