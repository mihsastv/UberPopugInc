import { Entity, Enum, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import * as uuid from 'uuid4';
import { TaskStatus, TaskCreatedEvent } from '@uber-popug/task.contract';

@Entity()
export class Task implements TaskCreatedEvent {
  @PrimaryKey()
  @Unique()
  publicId: string;

  @Property()
  description: string;

  @Enum(() => TaskStatus)
  status: TaskStatus;

  @Property({ type: Date })
  createdDate: Date;

  @Property()
  popugId: string;

  @Property({ type: 'int' })
  assignPrice: number;

  @Property({ type: 'int' })
  complitedPrice: number;

  @Property()
  title: string;

  @Property({ default: '' })
  jiraId?: string;

  @Property({ type: 'timestamp' })
  createdAt: Date;

  constructor(props: Omit<Task, 'publicId' | 'status'>) {
    this.assignPrice = props.assignPrice;
    this.complitedPrice = props.complitedPrice;
    this.createdDate = props.createdDate || new Date();
    this.publicId = uuid.default();
    this.description = props.description;
    this.status = TaskStatus.TASK_STATUS_PROCESSING;
    this.popugId = props.popugId;
    this.title = props.title;
    this.jiraId = props.jiraId || '';
    this.createdAt = new Date();
  }
}
