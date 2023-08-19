import { Entity, Enum, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import * as uuid from 'uuid4';

enum AccountStatus {
  CLOSE = 'CLOSE',
  OPEN = 'OPEN',
}

@Entity()
export class Account {
  @PrimaryKey()
  @Unique()
  publicId: string;

  @Property()
  profileId: string;

  @Property()
  balanceAmount: number;

  @Enum(() => AccountStatus)
  status: AccountStatus;

  constructor(props: Omit<Account, 'publicId' | 'balanceAmount' | 'status'>) {
    this.publicId = uuid.default();
    this.profileId = props.profileId;
    this.balanceAmount = 0;
    this.status = AccountStatus.OPEN;
  }
}
