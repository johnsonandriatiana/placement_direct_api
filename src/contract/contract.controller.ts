import { Controller, UseInterceptors, ClassSerializerInterceptor, Post, Body, UseGuards, Get, Param, Delete } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractDto } from './dto/contract.dto';
import { ContractEntity } from './contract.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('contract')
export class ContractController {
    constructor(private readonly contractService: ContractService) { }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)  
    @ApiBearerAuth()
    @Post()
    create(@Body() createUserDto: ContractDto): Promise<ContractEntity> {
        return this.contractService.create(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiBearerAuth()
    @Get()
    findAll(): Promise<ContractEntity[]> {
        return this.contractService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiBearerAuth()
    @Get(':id')
    findOne(@Param('id') id: string): Promise<ContractEntity> {
        return this.contractService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @ApiBearerAuth()
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.contractService.remove(id);
    }
}
