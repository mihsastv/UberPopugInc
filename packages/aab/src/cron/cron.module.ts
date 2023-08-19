import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { AccountModule } from '../account/account.module';
import { TransactionJournalModule } from '../transaction-journal/transaction-journal.module';
import { PaymentCycleModule } from '../payment-cycle/payment-cycle.module';

@Module({
  providers: [CronService],
  imports: [AccountModule, TransactionJournalModule, PaymentCycleModule],
})
export class CronModule {}
