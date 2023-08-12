import { Entity, Enum, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import * as uuid from 'uuid4';

export enum RoleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  TOP = 'TOP',
}

@Entity()
export class Profile {
  @PrimaryKey()
  public_id: string;

  /** profile name */
  @Property()
  @Unique()
  login: string;

  @Enum(() => RoleEnum)
  role: RoleEnum;

  @Property()
  password: string;

  constructor(props: Omit<Profile, 'public_id'>) {
    this.public_id = uuid();
    this.login = props.login;
    this.password = props.password;
    this.role = props.role;
  }
}
