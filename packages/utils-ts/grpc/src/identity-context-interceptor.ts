// import { Metadata } from '@grpc/grpc-js';
// import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
// // import { extractIdentity, IdentityContext } from '@vm/utils-auth';
// import { AsyncLocalStorage } from 'node:async_hooks';
// import { Observable } from 'rxjs';
//
// export const IdentityContextLocalStorage = new AsyncLocalStorage<IdentityContext>();
// function extractIdentityContext(context: ExecutionContext): IdentityContext | undefined {
//   try {
//     return extractIdentity(context.switchToRpc().getContext<Metadata>());
//   } catch {
//     return undefined;
//   }
// }
// @Injectable()
// export class IdentityContextInterceptor implements NestInterceptor {
//   public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const identityContext = extractIdentityContext(context);
//     if (!identityContext) {
//       return next.handle();
//     }
//     return new Observable((subscriber) => {
//       const subscription = IdentityContextLocalStorage.run(identityContext, () => {
//         return next.handle().subscribe(subscriber);
//       });
//       return () => subscription.unsubscribe();
//     });
//   }
// }
