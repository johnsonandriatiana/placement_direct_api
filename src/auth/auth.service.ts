import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService: JwtService) { }

    async validateUser(identity: string, password: string): Promise<any> {
        const user = await this.usersService.findByParam({ where: [{ username: identity }, { email: identity }] });
        if (user && user.comparePassword(password)) {
            const { password, ...result } = user;
            return result;
          }
          return null;
    }


    async login(user: any) {
        const payload = { ...user, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
