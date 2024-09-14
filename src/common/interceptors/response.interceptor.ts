import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { defaultPayload, Payload } from '@/common/api.schema';

@Injectable()
export class ResponseTransformInterceptor<T>
  implements NestInterceptor<T, Payload<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Payload<T>> {
    const hostType = context.getType();
    return next.handle().pipe(
      map((data) => {
        if (hostType === 'http') {
          return data?.meta
            ? {
                ...defaultPayload,
                data: data.data,
                meta: data.meta,
              }
            : {
                ...defaultPayload,
                data: data ?? null,
              };
        }
        return data;
      }),
    );
  }
}
