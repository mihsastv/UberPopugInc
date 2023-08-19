import { EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { Task } from '../model';
import { ProfileService } from '../profile/profile.service';
import { TaskStatus } from '@uber-popug/task.contract';
import { TaskProducerService } from './task.producer';
import { CreateTaskDto } from './taskDto';

@Injectable()
export class TaskAgregateService {
  constructor(
    private readonly em: EntityManager,
    private readonly profileService: ProfileService,
    private readonly taskProducerService: TaskProducerService,
  ) {}

  async creteTask(props: CreateTaskDto): Promise<Task> {
    const popugId = await this.profileService.getRandomPopug();

    const newTask = new Task({
      ...props,
      popugId,
      createdDate: new Date(),
      assignPrice: this.getAssignPrice(),
      complitedPrice: this.getComplitedPrice(),
    });

    await this.em.persistAndFlush(newTask).then(() => {
      this.taskProducerService.taskCreated(newTask);
    });

    return newTask;
  }

  async reassignTasks(): Promise<void> {
    const openedTask = await this.em.find(Task, {
      status: TaskStatus.TASK_STATUS_PROCESSING,
    });

    for (const task of openedTask) {
      const popugId = await this.profileService.getRandomPopug();

      task.popugId = popugId;
      this.taskProducerService.taskReasigned({
        publicId: task.publicId,
        popugId,
      });
    }

    this.em.flush();
  }

  async taskComplited(publicId: string): Promise<boolean> {
    const task = await this.em.findOne(Task, {
      publicId,
      status: TaskStatus.TASK_STATUS_COMPLITED,
    });

    if (!task) {
      return false;
    }

    task.status = TaskStatus.TASK_STATUS_COMPLITED;

    await this.em.flush().then(() => {
      this.taskProducerService.taskComplited({ publicId: task.publicId });
    });

    return true;
  }

  private getAssignPrice(): number {
    return Math.floor(Math.random() * (20 - 10 + 1) + 10);
  }

  private getComplitedPrice(): number {
    return Math.floor(Math.random() * (40 - 20 + 1) + 20);
  }
}
