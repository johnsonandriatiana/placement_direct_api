import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContractEntity } from './contract.entity';
import { Repository, DeleteResult, In } from 'typeorm';
import { ContractDto } from './dto/contract.dto';

@Injectable()
export class ContractService {
    constructor(
        @InjectRepository(ContractEntity)
        private readonly contractRepository: Repository<ContractEntity>,
    ) { }

    async create(userDto: ContractDto): Promise<ContractEntity> {

        const { name, content } = userDto;

        const user: ContractEntity = await this.contractRepository.create({ name, content });
        return await this.contractRepository.save(user);

    }

    async findAll(): Promise<ContractEntity[]> {
        const data = await this.contractRepository.find();
        return data;
    }


    async findAllByIds(ids: String[]): Promise<ContractEntity[]> {
        const data = await this.contractRepository.find({where: {
            id : In(ids) 
        }});
        return data;
    }

    async findOne(id: string): Promise<ContractEntity> {
        const data = await this.contractRepository.findOne(id);
        return data;
    }
    async findByName(username: string): Promise<ContractEntity> {
        const data = await this.contractRepository.findOne(username);
        return data;
    }

    async remove(id: string): Promise<void> {
        await await this.contractRepository.delete(id);
    }

    async update(
        id: number,
        newValue: ContractDto,
    ): Promise<ContractEntity | null> {
        const user = await this.contractRepository.findOneOrFail(id);
        if (!user.id) {

        }
        await this.contractRepository.update(id, newValue);
        return await this.contractRepository.findOne(id);
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.contractRepository.delete(id);
    }
}
