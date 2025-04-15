import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common/interfaces';
import { plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { UserDTO } from 'src/users/dtos/user.dto';

export class SerialzeInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(UserDTO, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
