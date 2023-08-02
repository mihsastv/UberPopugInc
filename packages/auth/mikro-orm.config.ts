import { Options } from '@mikro-orm/core';

import { ConfigService } from '@nestjs/config';

import * as Entities from './src/model';

const configService = new ConfigService();

const MikroOrmConfig: Options = {
  dbName: configService.get('VM_SCAN_POLICY_POSTGRES_DB'),
  entities: [Entities.Profile, Entities.Task],
  host: configService.get('VM_SCAN_POLICY_POSTGRES_HOST'),
  password: configService.get('VM_SCAN_POLICY_POSTGRES_PASSWORD'),
  port: configService.get('VM_SCAN_POLICY_POSTGRES_PORT'),
  type: 'postgresql',
  user: configService.get('VM_SCAN_POLICY_POSTGRES_USER'),
};

export default MikroOrmConfig;
