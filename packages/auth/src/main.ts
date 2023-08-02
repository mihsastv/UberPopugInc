import { PlatformApp } from '@rsdk/core';
import { GrpcTransport } from '@rsdk/grpc.server';
import scanPolicyPkg from '@vm/scan-policy-grpc';

import { ProfileModule } from './profile/profile.module';
import { TaskModule } from './task/task.module';

function main(): void {
  const app = new PlatformApp({
    modules: [TaskModule, ProfileModule],
    transports: [new GrpcTransport(scanPolicyPkg)],
  });

  app.run();
}

main();
