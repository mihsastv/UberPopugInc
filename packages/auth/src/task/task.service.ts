import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import type {
  CreateTaskRequest,
  CreateTaskResponse,
  DeleteTaskRequest,
  DeleteTaskResponse,
  GetTaskResponse,
  UpdateTaskRequest,
  UpdateTaskResponse,
} from '@vm/scan-policy-grpc';

import { Task } from '../model';

class SanitazeUpdateTaskRequest implements UpdateTaskRequest {
  name?: string;
  description?: string;
  profileId?: string;
  adressPlaceId?: string;
  collectorId?: string;
  accountIds?: string;
  targets?: string;
  targetsExcludes?: string;
  id!: string;
  organizationId!: string;
}

@Injectable()
export class TaskService {
  constructor(private readonly em: EntityManager) {}

  public async get(): Promise<GetTaskResponse> {
    const data = await this.em.find(Task, {}, {});

    return { success: true, data };
  }

  public async create(request: CreateTaskRequest): Promise<CreateTaskResponse> {
    const account = new Task({
      ...request,
    });

    await this.em.persistAndFlush(account);
    return { success: true, data: account };
  }

  public async delete(request: DeleteTaskRequest): Promise<DeleteTaskResponse> {
    const account = await this.em.findOne(Task, { id: request.id });

    if (!account) {
      return {
        success: false,
        data: request,
        error: `Task ${request.id} not found`,
      };
    }

    await this.em.removeAndFlush(account);
    return { success: true, data: request };
  }

  public async update(request: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    const task = await this.em.findOne(Task, { id: request.id });

    if (!task) {
      return {
        success: false,
        data: request,
        error: `Account ${request.id} not found`,
      };
    }

    const id = request.id;
    const taskUpdate = { ...request } as SanitazeUpdateTaskRequest;

    await this.em.nativeUpdate(Task, { id }, taskUpdate);
    return { success: true, data: request };
  }
}
