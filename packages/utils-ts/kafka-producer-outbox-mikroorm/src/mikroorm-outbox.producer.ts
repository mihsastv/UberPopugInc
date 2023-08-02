import { EntityManager } from '@mikro-orm/core';
import type { DynamicModule } from '@nestjs/common';
import type { EventType } from '@rsdk/kafka.common';

import { MikroOrmProducer } from './mikroorm.producer';

export class MikroOrmOutboxProducer {
  static forEvent(eventType: EventType | EventType[]): DynamicModule {
    const eventTypes = Array.isArray(eventType) ? eventType : [eventType];

    const providers = eventTypes.map((eventType) => ({
      inject: [EntityManager],
      provide: eventType.$type,
      useFactory: (em: EntityManager): MikroOrmProducer<EventType> =>
        new MikroOrmProducer(eventType, em),
    }));

    const moduleDef = {
      module: MikroOrmOutboxProducer,
      providers,
      exports: providers,
    };

    return moduleDef;
  }
}
