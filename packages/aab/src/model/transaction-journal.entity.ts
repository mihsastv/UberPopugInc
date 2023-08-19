import { Entity, Enum, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import * as uuid from 'uuid4';

export enum TransactionStatus {
  WAIT = 'WAIT',
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

@Entity()
export class TransactionJournal {
  @PrimaryKey()
  @Unique()
  publicId: string;

  @Property()
  profileId: string;

  @Property({ type: 'int' })
  balance: number;

  @Enum(() => TransactionStatus)
  status: TransactionStatus;

  constructor(
    props: Omit<TransactionJournal, 'publicId' | 'status' | 'createdAt'>,
  ) {
    this.publicId = uuid.default();
    this.profileId = props.profileId;
    this.balance = props.balance;
    this.status = TransactionStatus.WAIT;
  }
}
