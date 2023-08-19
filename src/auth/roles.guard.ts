/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { UNAUTHORIZED_USER } from 'src/constants/exception.constants';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requieredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      if (!requieredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException(UNAUTHORIZED_USER);
      }

      const user = this.jwtService.verify(token);
      req.user = user;
      const roleArray = Object.entries(user.roles);
      const keys = Object.keys(user.roles);
      const index = keys.indexOf('value');
      return roleArray[index].some((value) => requieredRoles.includes(value));
    } catch (e) {
      throw new UnauthorizedException(UNAUTHORIZED_USER);
    }
  }
}
