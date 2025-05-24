import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';
import { KEY } from 'src/decorators/role-decorators';


@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean {
    let roles: UserRole[] = this.reflector.getAllAndOverride(KEY, [
      context.getHandler(),
      context.getClass()
    ])
    
    if (!roles) {
      return true;
    }
    
    const req = context.switchToHttp().getRequest()
    if (!roles.includes(req['user'].role)) {
      throw new UnauthorizedException('Not allowed')
    };
    return true
  }
}
