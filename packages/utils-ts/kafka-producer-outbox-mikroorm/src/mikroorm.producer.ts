import type { EntityManager } from '@mikro-orm/core';
import type { EventType } from '@rsdk/kafka.common';
import type { PublishOptions } from '@rsdk/kafka.producer';
import { BaseProducer } from '@rsdk/kafka.producer';

import { Outbox } from './outbox.entity';

export class MikroOrmProducer<T extends EventType> extends BaseProducer<T> {
  constructor(readonly protoType: T, private readonly em: EntityManager) {
    super(protoType);
  }

  async publish(payload: T, options?: PublishOptions): Promise<void> {
    const outbox = new Outbox({
      ...this.parsePayload(payload, options),
      payload: Buffer.from(JSON.stringify(payload), 'utf8'),
    } as Outbox);

    this.em.persist(outbox);
  }
}
