import { Options } from '@mikro-orm/core';

import { ConfigService } from '@nestjs/config';

import * as Entities from './src/model';

const configService = new ConfigService();

const MikroOrmConfig: Options = {
  dbName: configService.get('UBER_POPUG_AAB_POSTGRES_DB'),
  entities: [
    Entities.Account,
    Entities.BalanceJournal,
    Entities.PaymentCycle,
    Entities.Profile,
    Entities.Task,
    Entities.TransactionJournal,
  ],
  host: configService.get('UBER_POPUG_AAB_POSTGRES_HOST'),
  password: configService.get('UBER_POPUG_AAB_POSTGRES_PASSWORD'),
  port: configService.get('UBER_POPUG_AAB_POSTGRES_PORT'),
  type: 'postgresql',
  user: configService.get('UBER_POPUG_AAB_POSTGRES_USER'),
};

export default MikroOrmConfig;
