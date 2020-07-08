import { Controller, Post, Body, Get, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('user')
export class UserController {
    constructor(private readonly usersService: UserService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    
    @Post()
    create(@Body() createUserDto: UserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Roles('admin')
    @UseGuards(RolesGuard) 
    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(id);
    }
}
