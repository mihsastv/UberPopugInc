import { Entity, Enum, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import * as uuid from 'uuid4';

export enum PaymentType {
  ASSIGN = 'ASSIGN',
  PAYMENT = 'PAYMENT',
  WITHDRAWAL = 'WITHDRAWAL',
  WITHDRAWALFAIL = 'WITHDRAWALFAIL',
}

@Entity()
export class BalanceJournal {
  @PrimaryKey()
  @Unique()
  publicId: string;

  @Property()
  accountId: string;

  @Property()
  taskId: string;

  @Property()
  cycleId: string;

  @Enum(() => PaymentType)
  paymentType: PaymentType;

  @Property()
  debit: number;

  @Property()
  credit: number;

  constructor(props: Omit<BalanceJournal, 'publicId'>) {
    this.publicId = uuid.default();
    this.accountId = props.accountId;
    this.taskId = props.taskId;
    this.cycleId = props.cycleId;
    this.paymentType = props.paymentType;
    this.debit = props.debit;
    this.credit = props.credit;
  }
}
