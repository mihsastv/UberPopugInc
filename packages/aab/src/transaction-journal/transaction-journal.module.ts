import { Module } from '@nestjs/common';
import { TransactionJournalService } from './transaction-journal.service';
import { TransactionJournalAggregateService } from './transaction-journal-aggregate.service';
import { TransactionJournal } from '../model';
import { UtilsMikroOrmModule } from '@uber-popug/utils-mikro-orm';
import { AccountModule } from '../account/account.module';

@Module({
  exports: [TransactionJournalAggregateService],
  imports: [UtilsMikroOrmModule.forRoot([TransactionJournal]), AccountModule],
  providers: [TransactionJournalService, TransactionJournalAggregateService],
})
export class TransactionJournalModule {}
