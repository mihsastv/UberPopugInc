import { Config, ConfigSection, IntParser, Property } from '@rsdk/core';

@ConfigSection()
export class EventConveourConfig extends Config {
  @Property('CONTEXT_TIMEOUT', new IntParser(), {
    description: 'Timeout context for the kafka server',
  })
  public readonly hertbeatTimeout!: number;
}
