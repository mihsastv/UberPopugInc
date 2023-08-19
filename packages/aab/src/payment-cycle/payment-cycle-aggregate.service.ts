import { Injectable } from '@nestjs/common';
import { PaymentCycleService } from './payment-cycle.service';

@Injectable()
export class PaymentCycleAggregateService {
  constructor(private paymentCycleService: PaymentCycleService) {}

  getCurrentCycle() {
    return this.paymentCycleService.getCerruntBalace();
  }

  closeCycleActiveCycle() {
    this.paymentCycleService.closeCycle();
  }
}
