import { Entity, Enum, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import * as uuid from 'uuid4';
import { Role } from '@uber-popug/profile.contract';

@Entity()
export class Profile {
  @PrimaryKey()
  publicId: string;

  /** profile name */
  @Property()
  @Unique()
  login: string;

  @Enum(() => Role)
  role: Role;

  @Property()
  password: string;

  constructor(props: Omit<Profile, 'publicId'>) {
    this.publicId = uuid.default();
    this.login = props.login;
    this.password = props.password;
    this.role = props.role;
  }
}
