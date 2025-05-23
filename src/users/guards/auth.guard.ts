import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};
    if (!userId)
      throw new UnauthorizedException(
        'You must be logged in to access this resource',
      );
    return true;
  }
}
