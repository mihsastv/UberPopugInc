import { MikroORM, RequestContext } from '@mikro-orm/core';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class RequestContextEntityManagerInterceptor implements NestInterceptor {
  constructor(private readonly orm: MikroORM) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const globalEntityManager = this.orm.em;

    return new Observable((subscriber) => {
      RequestContext.createAsync(globalEntityManager, async () => {
        return lastValueFrom(next.handle());
      })
        .then((val) => {
          subscriber.next(val);
        })
        .catch((err) => {
          subscriber.error(err);
        });
    });
  }
}
