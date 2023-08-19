import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Account, Task } from '../model';

import {
  TaskCreatedEvent,
  TaskReasignedEvent,
  TaskComplitedEvent,
} from '@uber-popug/task.contract/dist/task.v2';
import { AccountAgregateService } from '../account/account.aggregate';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  BalanceAssigned,
  BalanceComplited,
} from '../balance-journal/balance-journal.dto';
import { TASK_ASSIGN, TASK_COMPLITED } from '../common/event.const';

@Injectable()
export class TaskEventService {
  constructor(
    private readonly em: EntityManager,
    private accountService: AccountAgregateService,
    private eventEmitter: EventEmitter2,
  ) {}

  async createdTask(payload: TaskCreatedEvent): Promise<void> {
    const newTask = new Task(payload as Task);

    this.em.persistAndFlush(newTask);
    const account = (await this.accountService.getAccountId(
      payload.popugId,
    )) as Account;

    this.eventEmitter.emit(
      TASK_ASSIGN,
      new BalanceAssigned({
        taskId: newTask.publicId,
        credit: newTask.assignPrice,
        accountId: account?.publicId,
      }),
    );
  }

  async complitedTask(payload: TaskComplitedEvent): Promise<void> {
    const task = await this.em.findOne(Task, payload);
    if (!task) {
      return;
    }

    const account = await this.accountService.getAccountId(task.popugId);
    if (!account) {
      return;
    }

    this.eventEmitter.emit(
      TASK_COMPLITED,
      new BalanceComplited({
        taskId: task.publicId,
        debet: task.complitedPrice,
        accountId: account.profileId,
      }),
    );
  }

  async reassignedTask(payload: TaskReasignedEvent): Promise<void> {
    const task = await this.em.findOne(Task, payload);
    if (!task) {
      return;
    }
    task.popugId = payload.popugId;
    this.em.flush();

    this.eventEmitter.emit(
      TASK_ASSIGN,
      new BalanceAssigned({
        taskId: payload.publicId,
        credit: task.assignPrice,
        accountId: payload.popugId,
      }),
    );
  }
}
