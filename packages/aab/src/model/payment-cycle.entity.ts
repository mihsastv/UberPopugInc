import { Entity, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import * as uuid from 'uuid4';

@Entity()
export class PaymentCycle {
  @PrimaryKey()
  @Unique()
  publicId: string;

  @Property()
  description: string;

  @Property({ type: Date })
  beginDate: Date;

  @Property({ type: Date })
  endDate: Date;

  @Property()
  status: 'OPEN' | 'CLOSE';

  constructor(props: Omit<PaymentCycle, 'publicId' | 'status'>) {
    this.publicId = this.publicId = uuid.default();
    this.status = 'OPEN';
    this.description = props.description;
    this.beginDate = props.beginDate;
    this.endDate = props.endDate;
  }
}
