import { AnyEntity, EntityClass, EntityClassGroup, EntitySchema } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { DynamicModule, Module } from '@nestjs/common';
import { PlatformConfigModule } from '@rsdk/core';

import { MikroOrmConfig } from './mikro-orm.config';

@Module({})
export class UtilsMikroOrmModule {
  public static forRoot(
    entities: (string | EntityClass<AnyEntity> | EntityClassGroup<AnyEntity> | EntitySchema)[],
  ): DynamicModule {
    return {
      imports: [
        MikroOrmModule.forRootAsync({
          imports: [PlatformConfigModule.forFeature(MikroOrmConfig)],
          inject: [MikroOrmConfig],
          useFactory: (config: MikroOrmConfig) => ({
            cache: {
              enabled: false,
            },
            allowGlobalContext: true,
            debug: config.postgresDebug,
            entities,
            dbName: config.postgresDb,
            user: config.postgresUser,
            password: config.postgresPassword,
            host: config.postgresHost,
            port: config.postgresPort,
            type: 'postgresql',
          }),
        }),
      ],
      module: UtilsMikroOrmModule,
    };
  }
}
