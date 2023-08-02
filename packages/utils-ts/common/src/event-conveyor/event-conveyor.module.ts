import { Module } from '@nestjs/common';
import { PlatformConfigModule } from '@rsdk/core';

import { EventConveourConfig } from './event-conveyor.config';
import { EventConveyorService } from './event-conveyor.service';

export { EventConveyorService } from './event-conveyor.service';

@Module({
  imports: [PlatformConfigModule.forFeature(EventConveourConfig)],
  providers: [EventConveyorService],
  exports: [EventConveyorService],
})
export class EventConveyorModule {}
