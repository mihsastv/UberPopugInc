import { Inject, Injectable } from '@nestjs/common';
import type { KafkaContext } from '@nestjs/microservices';
import { InjectLogger } from '@rsdk/core';
import { commitOffset } from '@rsdk/kafka.transport';
import { ILogger } from '@rsdk/logging';

import { EventConveourConfig } from './event-conveyor.config';

export type PerformContextType = {
  context: KafkaContext;
  contextExpireExec: NodeJS.Timeout;
};

@Injectable()
export class EventConveyorService {
  @Inject() private readonly config!: EventConveourConfig;

  private kafkaContextArr = new Map<string, PerformContextType>();

  constructor(@InjectLogger(EventConveyorService) private logger: ILogger) {}

  /**
   * Context clear an consumer resume
   * */
  public contextSubmit(key: string): void {
    this.consumerResume(this.contextClear(key));
  }

  /**
   * Добавляем контекст в список существующих контекстов
   * */
  public async contextAdd(props: {
    key: string;
    context: KafkaContext;
  }): Promise<void> {
    this.logger.info(`Add Context ${props.key}`);

    if (this.kafkaContextArr.has(props.key)) {
      this.logger.info(`Context ${props.key} already added`);
      return;
    }

    await commitOffset(props.context);

    props.context.getConsumer().pause([
      {
        topic: props.context.getTopic(),
        partitions: [props.context.getPartition()],
      },
    ]);

    const contextExpireExec = setTimeout(
      this.contextExpire.bind(this, props.key),
      this.config.hertbeatTimeout,
    );

    this.kafkaContextArr.set(props.key, {
      context: props.context,
      contextExpireExec,
    });
  }

  /**
   * Получить контекст
   * */
  public contextGet(key: string): PerformContextType | undefined {
    return this.kafkaContextArr.get(key);
  }

  /**
   * Очитсть все существующие контекст
   * */
  public allContextClear(): void {
    this.logger.info(`Clear all context`);
    for (const el of this.kafkaContextArr.keys()) {
      const { context, contextExpireExec } = this.kafkaContextArr.get(
        el,
      ) as PerformContextType;

      if (context) {
        clearTimeout(contextExpireExec);
        context
          .getConsumer()
          .resume([
            { topic: context.getTopic(), partitions: [context.getPartition()] },
          ]);
      }
    }

    this.kafkaContextArr.clear();
  }

  private consumerResume(context: KafkaContext | void): void {
    if (!context) {
      return;
    }

    context
      .getConsumer()
      .resume([
        { topic: context.getTopic(), partitions: [context.getPartition()] },
      ]);
  }

  private contextClear(key: string): KafkaContext | void {
    const ctx = this.kafkaContextArr.get(key);
    if (!ctx) {
      this.logger.info(`Context ${key} not found`);
      return;
    }

    const { context, contextExpireExec } = ctx as PerformContextType;

    clearTimeout(contextExpireExec);
    this.kafkaContextArr.delete(key);
    return context;
  }

  private contextExpire(key: string): void {
    this.logger.info(`Expire context ${key}`);
    this.consumerResume(this.contextClear(key));
  }
}
