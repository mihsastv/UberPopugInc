import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { PaymentCycle } from '../model';

@Injectable()
export class PaymentCycleService {
  constructor(private em: EntityManager) {}

  async getCerruntBalace() {
    return await this.em.findOne(PaymentCycle, { status: 'OPEN' });
  }

  async closeCycle() {
    const cycle = await this.em.findOne(PaymentCycle, { status: 'OPEN' });

    if (!cycle) {
      const beginDate = new Date();
      beginDate.setHours(0, 0, 0, 0);

      const newCycle = new PaymentCycle({
        beginDate,
        endDate: new Date(beginDate.setDate(beginDate.getDate() + 1)),
        description: 'Start cycle',
      });
      this.em.persistAndFlush(newCycle);
      return;
    }

    const beginDate = cycle?.endDate || new Date();
    const newCycle = new PaymentCycle({
      beginDate,
      endDate: new Date(beginDate.setDate(beginDate.getDate() + 1)),
      description: 'Start cycle',
    });

    cycle.status = 'CLOSE';
    this.em.flush();

    this.em.persistAndFlush(newCycle);
  }
}
