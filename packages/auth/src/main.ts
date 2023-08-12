import { PlatformApp } from '@rsdk/core';
import { HttpTransport } from '@rsdk/http.server';
import { ExpressAdapter } from '@nestjs/platform-express';

import { ProfileModule } from './profile/profile.module';
import { AuModule } from './au/au.module';

function main(): void {
  const express = new ExpressAdapter();

  const app = new PlatformApp({
    modules: [ProfileModule, AuModule],
    transports: [new HttpTransport(express, { globalPrefix: 'api' })],
  });

  app.run();
}

main();
