import type { EventType } from '@rsdk/kafka.common';
import type { OutboxTable, PublishOptions } from '@rsdk/kafka.producer';
import { BaseProducer } from '@rsdk/kafka.producer';

export class OutboxProducer<T extends EventType> extends BaseProducer<T> {
  constructor(readonly protoType: T) {
    super(protoType);
  }

  async publish(): Promise<void> {
    return;
  }

  public override parsePayload(
    payload: T,
    options?: PublishOptions,
  ): Partial<OutboxTable> {
    return super.parsePayload(payload, options);
  }
}
