import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector, private jwtService: JwtService) { }

    canActivate (context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const res = <Partial<User>>this.jwtService.decode(request.headers.authorization.split(' ')[1] )
        
        // const user = res;
        // const hasRole = () =>
        //     user.roles.some(role => !!roles.find(item => item === role));
        // return user && user.roles && hasRole();
        return true;
    }
}