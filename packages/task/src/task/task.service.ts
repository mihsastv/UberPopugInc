import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Task } from '../model';
import { Role } from '@uber-popug/profile.contract';

@Injectable()
export class TaskService {
  constructor(private readonly em: EntityManager) {}

  getTasks(props: { popugId: string; role: Role }): Promise<Task[]> {
    const queriesProps: { popugId?: string } = {};
    if (props.role === Role.ROLE_USER) {
      queriesProps.popugId = props.popugId;
    }

    return this.em.find<Task>(Task, queriesProps);
  }
}
