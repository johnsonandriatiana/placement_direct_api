import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContractEntity } from './contract.entity';
import { Repository, DeleteResult } from 'typeorm';
import { ContractDto } from './dto/contract.dto';

@Injectable()
export class ContractService {
    constructor(
        @InjectRepository(ContractEntity)
        private readonly usersRepository: Repository<ContractEntity>,
    ) { }

    async create(userDto: ContractDto): Promise<ContractEntity> {

        const { name, content } = userDto;

        const user: ContractEntity = await this.usersRepository.create({ name, content });
        return await this.usersRepository.save(user);

    }

    async findAll(): Promise<ContractEntity[]> {
        const data = await this.usersRepository.find();
        return data;
    }

    async findOne(id: string): Promise<ContractEntity> {
        const data = await this.usersRepository.findOne(id);
        return data;
    }
    async findByName(username: string): Promise<ContractEntity> {
        const data = await this.usersRepository.findOne(username);
        return data;
    }

    async remove(id: string): Promise<void> {
        await await this.usersRepository.delete(id);
    }

    async update(
        id: number,
        newValue: ContractDto,
    ): Promise<ContractEntity | null> {
        const user = await this.usersRepository.findOneOrFail(id);
        if (!user.id) {

        }
        await this.usersRepository.update(id, newValue);
        return await this.usersRepository.findOne(id);
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.usersRepository.delete(id);
    }
}
