import { PlatformApp } from '@rsdk/core';
import { HttpTransport } from '@rsdk/http.server';
import { ExpressAdapter } from '@nestjs/platform-express';
import { TaskModule } from './task/task.module';
import { ProfileModule } from './profile/profile.module';
import { KafkaTransport } from '@rsdk/kafka.transport';

function main(): void {
  const express = new ExpressAdapter();

  const app = new PlatformApp({
    modules: [TaskModule, ProfileModule],
    transports: [
      new HttpTransport(express, { globalPrefix: 'api' }),
      new KafkaTransport({
        autoCommit: true,
      }),
    ],
  });

  app.run();
}

main();
