import { ConstraintViolationException, EntityManager } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  constructor(private readonly em: EntityManager) {}
}
