import { PlatformApp } from '@rsdk/core';
import { GrpcTransport } from '@rsdk/grpc.server';

import { ProfileModule } from './profile/profile.module';

function main(): void {
  const app = new PlatformApp({
    modules: [ProfileModule],
    transports: [new HttpTransport()],
  });

  app.run();
}

main();
