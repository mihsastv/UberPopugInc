import { Entity, Enum, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Role } from '@uber-popug/profile.contract';

@Entity()
export class Profile {
  @PrimaryKey()
  publicId: string;

  @Property()
  @Unique()
  login: string;

  @Enum(() => Role)
  role: Role;

  @Property({ type: 'bool' })
  deleted: boolean;

  constructor(props: Omit<Profile, 'deleted'>) {
    this.deleted = false;
    this.publicId = props.publicId;
    this.login = props.login;
    this.role = props.role;
  }
}
