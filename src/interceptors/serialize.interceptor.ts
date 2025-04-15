import { UseInterceptors } from '@nestjs/common';
import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common/interfaces';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';

interface ClassConstructor {
  new (...args: any[]): {};
}
//custom decorator 
export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerialzeInterceptor(dto));
}

export class SerialzeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
