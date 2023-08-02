import { BoolParser, Config, ConfigSection, IntParser, Property, StringParser } from '@rsdk/core';

@ConfigSection()
export class MikroOrmConfig extends Config {
  @Property('POSTGRES_DB', new StringParser(), {
    description: 'Postgres database name',
  })
  public readonly postgresDb!: string;

  @Property('POSTGRES_USER', new StringParser(), {
    description: 'Postgres user',
  })
  public readonly postgresUser!: string;

  @Property('POSTGRES_PASSWORD', new StringParser(), {
    description: 'Postgres user password',
  })
  public readonly postgresPassword!: string;

  @Property('POSTGRES_HOST', new StringParser(), {
    description: 'Postgres host',
  })
  public readonly postgresHost!: string;

  @Property('POSTGRES_PORT', new IntParser(), {
    description: 'Postgres port',
  })
  public readonly postgresPort!: number;

  @Property('POSTGRES_DEBUG', new BoolParser(), {
    description: 'Postgres connection debug mode',
    defaultValue: false,
  })
  public readonly postgresDebug!: boolean;
}
