import { Entity, Enum, Property } from '@mikro-orm/core';

export enum RoleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN ',
  MANAGER = 'MANAGER',
  TOP = 'TOP',
}

@Entity()
export class Profile {
  /** profile name */
  @Property()
  name: string;

  constructor(props: Omit<Profile, 'public_id'>) {
    this.name = props.name;
  }
}
