import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { SigningDto } from './dto/signing.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Body() userLogin: SigningDto) {
        return this.authService.login(userLogin);
    }
}
