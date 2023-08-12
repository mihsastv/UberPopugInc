import { PlatformApp } from '@rsdk/core';
import { HttpTransport } from '@rsdk/http.server';
import { ExpressAdapter } from '@nestjs/platform-express';
import { TaskModule } from './task/task.module';

function main(): void {
  const express = new ExpressAdapter();

  const app = new PlatformApp({
    modules: [TaskModule],
    transports: [new HttpTransport(express, { globalPrefix: 'api' })],
  });

  app.run();
}

main();
