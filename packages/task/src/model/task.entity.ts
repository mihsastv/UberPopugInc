import { Entity, Enum, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import * as uuid from 'uuid4';

@Entity()
export class Task {
  @PrimaryKey()
  public_id: string;

  /** profile name */
  @Property()
  @Unique()
  login: string;

  @Property()
  password: string;

  constructor(props: Omit<Task, 'public_id'>) {
    this.public_id = uuid();
    this.login = props.login;
    this.password = props.password;
  }
}
