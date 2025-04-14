import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common/interfaces';
import { map, Observable } from 'rxjs';

export class SerialzeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    console.log('Running before thehandler', context);
    return next.handle().pipe(
      map((data: any) => {
        console.log('I am running before response is sent out', data);
      }),
    );
  }
}
