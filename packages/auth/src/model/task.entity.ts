import { Entity, Property } from '@mikro-orm/core';
import { Identified } from '@vm/utils-mikro-orm';

@Entity()
export class Task extends Identified {
  /** Task name */
  @Property()
  name: string;

  /** Task description */
  @Property()
  description: string;

  /** Profile id */
  @Property()
  profileId: string;

  /** adress_place_id */
  @Property()
  adressPlaceId: string;

  /** collector_id */
  @Property()
  collectorId: string;

  /** account_ids */
  @Property()
  accountIds: string;

  /** targets */
  @Property()
  targets: string;

  /** targets_excludes */
  @Property()
  targetsExcludes: string;

  /** organization id */
  @Property()
  organizationId: string;

  constructor(props: Omit<Task, keyof Identified>) {
    super();
    this.name = props.name;
    this.description = props.description;
    this.profileId = props.profileId;
    this.adressPlaceId = props.adressPlaceId;
    this.collectorId = props.collectorId;
    this.accountIds = props.accountIds;
    this.targets = props.targets;
    this.targetsExcludes = props.targetsExcludes;
    this.organizationId = props.organizationId;
  }
}
