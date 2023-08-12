import { Options } from '@mikro-orm/core';

import { ConfigService } from '@nestjs/config';

import * as Entities from './src/model';

const configService = new ConfigService();

const MikroOrmConfig: Options = {
  dbName: configService.get('UBER_POPUG_AUTH_POSTGRES_DB'),
  entities: [Entities.Profile],
  host: configService.get('UBER_POPUG_AUTH_POSTGRES_HOST'),
  password: configService.get('UBER_POPUG_AUTH_POSTGRES_PASSWORD'),
  port: configService.get('UBER_POPUG_AUTH_POSTGRES_PORT'),
  type: 'postgresql',
  user: configService.get('UBER_POPUG_AUTH_POSTGRES_USER'),
};

export default MikroOrmConfig;
