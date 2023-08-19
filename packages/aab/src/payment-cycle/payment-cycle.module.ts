import { Module } from '@nestjs/common';
import { PaymentCycleService } from './payment-cycle.service';
import { PaymentCycle } from '../model';
import { UtilsMikroOrmModule } from '@uber-popug/utils-mikro-orm';
import { PaymentCycleAggregateService } from './payment-cycle-aggregate.service';

@Module({
  exports: [PaymentCycleAggregateService],
  imports: [UtilsMikroOrmModule.forRoot([PaymentCycle])],
  providers: [PaymentCycleService, PaymentCycleAggregateService],
})
export class PaymentCycleModule {}
