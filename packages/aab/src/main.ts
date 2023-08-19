import { PlatformApp } from '@rsdk/core';
import { HttpTransport } from '@rsdk/http.server';
import { ExpressAdapter } from '@nestjs/platform-express';
import { TaskModule } from './task/task.module';
import { ProfileModule } from './profile/profile.module';
import { KafkaTransport } from '@rsdk/kafka.transport';
import { AccountModule } from './account/account.module';
import { BalanceJournalModule } from './balance-journal/balance-journal.module';
import { TransactionJournalModule } from './transaction-journal/transaction-journal.module';
import { PaymentCycleModule } from './payment-cycle/payment-cycle.module';
import { AppModule } from './app.module';
import { CronModule } from './cron/cron.module';
import { AnalyticModule } from './analytic/analytic.module';

function main(): void {
  const express = new ExpressAdapter();

  const app = new PlatformApp({
    modules: [
      TaskModule,
      ProfileModule,
      AccountModule,
      BalanceJournalModule,
      TransactionJournalModule,
      PaymentCycleModule,
      CronModule,
      AppModule,
      AnalyticModule,
    ],
    transports: [
      new HttpTransport(express, { globalPrefix: 'api' }),
      new KafkaTransport({
        autoCommit: true,
      }),
    ],
  });

  app.run();
}

main();
