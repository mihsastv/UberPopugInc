import { Entity, Index, PrimaryKey, Property } from '@mikro-orm/core';
import type { EventType } from '@rsdk/kafka.common';
import { type OutboxTable } from '@rsdk/kafka.producer';
import * as uuid from 'uuid';

import { OutboxProducer } from './outbox-producer';

@Entity({ collection: 'outbox' })
export class Outbox implements OutboxTable {
  @PrimaryKey()
  public id!: string;

  @Index()
  @Property({ nullable: false })
  public type!: string;

  @Property({ nullable: false })
  public group!: string;

  @Property({ nullable: false })
  public partition_key!: string;

  @Property({ nullable: true, type: 'jsonb' })
  public metadata!: Record<string, any> | null;

  @Property({ nullable: false, type: 'bytea' })
  public payload!: Buffer;

  constructor(props: Omit<Outbox, 'id'>) {
    this.id = uuid.v4();
    this.type = props.type;
    this.group = props.group;
    this.partition_key = props.partition_key;
    this.payload = props.payload;
  }

  public static fromEvent<T>(event: EventType, payload: T): Outbox {
    const producer = new OutboxProducer(event);

    return new Outbox({
      ...producer.parsePayload(payload as EventType<T>),
      payload: Buffer.from(JSON.stringify(payload), 'utf8'),
    } as Outbox);
  }
}
