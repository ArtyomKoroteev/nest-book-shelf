import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../types';

const ROLES_KEY = 'roles';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return this.hasRole(user.role, roles);
  }

  private hasRole(userRole: Role, roles: Role[]): boolean {
    if (!roles.includes(userRole)) {
      throw new ForbiddenException(
        'Access denied. Contact your administrator.',
      );
    }
    return true;
  }
}

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
