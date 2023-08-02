import { Controller } from '@nestjs/common';
import type {
  CreateTaskRequest,
  CreateTaskResponse,
  DeleteTaskRequest,
  DeleteTaskResponse,
  GetTaskRequest,
  GetTaskResponse,
  TaskGrpcController,
  UpdateTaskRequest,
  UpdateTaskResponse,
} from '@vm/scan-policy-grpc';
import { TaskGrpcMethods } from '@vm/scan-policy-grpc';

import { TaskService } from './task.service';

@Controller()
@TaskGrpcMethods()
export class TaskController implements TaskGrpcController {
  constructor(private readonly taskService: TaskService) {}
  createTask(request: CreateTaskRequest): Promise<CreateTaskResponse> {
    return this.taskService.create(request);
  }

  deleteTask(request: DeleteTaskRequest): Promise<DeleteTaskResponse> {
    return this.taskService.delete(request);
  }

  updateTask(request: UpdateTaskRequest): Promise<UpdateTaskResponse> {
    return this.taskService.update(request);
  }

  getTask(request: GetTaskRequest): Promise<GetTaskResponse> {
    return this.taskService.get();
  }
}
