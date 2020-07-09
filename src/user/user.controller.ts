import { Controller, Post, Body, Get, Param, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserContractDto } from './dto/user-contract.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

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
    @ApiBearerAuth()
    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiBearerAuth()
    @Get(':id')
    findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiBearerAuth()
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(id);
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiBearerAuth()
    @Post('contract')
    createContractforUser(@Body() createUserContractDto: UserContractDto): Promise<User> {

        return this.usersService.createContractforUser(createUserContractDto);
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiBearerAuth()
    @Get('contract/:id')
    getUserContractById(@Param('id') id: string): Promise<User> {

        return this.usersService.getUserContractById(id);
    }

}
