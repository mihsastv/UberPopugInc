import { Module } from '@nestjs/common';
import { BalanceJournalService } from './balance-journal.service';
import { UtilsMikroOrmModule } from '@uber-popug/utils-mikro-orm';
import { BalanceJournal } from '../model';
import { AccountModule } from '../account/account.module';
import { PaymentCycleModule } from '../payment-cycle/payment-cycle.module';

@Module({
  imports: [
    UtilsMikroOrmModule.forRoot([BalanceJournal]),
    AccountModule,
    PaymentCycleModule,
  ],
  exports: [],
  providers: [BalanceJournalService],
})
export class BalanceJournalModule {}
