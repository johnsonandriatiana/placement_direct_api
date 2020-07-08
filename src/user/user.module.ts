import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constant';

@Module({
  imports: [TypeOrmModule.forFeature([User]),  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }),
],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
