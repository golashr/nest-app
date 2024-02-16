import { Reflector } from '@nestjs/core';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  logger = new Logger('RolesGuard');

  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles =
      this.reflector.get<string[]>('roles', context.getHandler()) || [];
    const rolesC =
      this.reflector.get<string[]>('roles', context.getClass()) || [];
    this.logger.log(JSON.stringify(roles));
    this.logger.log(JSON.stringify(rolesC));

    const publicRoles =
      this.reflector.get<string[]>('isPublic', context.getHandler()) || [];
    if (publicRoles.length > 0) {
      const request = context.switchToHttp().getRequest<Request>();
      this.logger.log(`public URL ${JSON.stringify(request.url)}`);
      return true;
    }

    return true;
  }
}
