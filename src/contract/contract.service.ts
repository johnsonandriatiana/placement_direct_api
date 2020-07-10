import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract } from './contract.entity';
import { Repository, DeleteResult, In } from 'typeorm';
import { ContractDto } from './dto/contract.dto';

@Injectable()
export class ContractService {
    constructor(
        @InjectRepository(Contract)
        private readonly contractRepository: Repository<Contract>,
    ) { }

    async create(contractDto: ContractDto): Promise<Contract> {

        const { name, content } = contractDto;

        const contract: Contract = await this.contractRepository.create({ name, content });
        return await this.contractRepository.save(contract);

    }

    async findAll(): Promise<Contract[]> {
        const data = await this.contractRepository.find();
        return data;
    }


    async findAllByIds(ids: String[]): Promise<Contract[]> {
        const data = await this.contractRepository.find({ id : In(ids)  } );
        return data;
    }

    async findOne(id: string): Promise<Contract> {
        const data = await this.contractRepository.findOne(id);
        if (!data) {
            throw new NotFoundException();
        }
        return data;
    }
    async findByName(username: string): Promise<Contract> {
        const data = await this.contractRepository.findOne(username);
        if (!data) {
            throw new NotFoundException();
        }
        return data;
    }

    async remove(id: string): Promise<void> {
        await await this.contractRepository.delete(id);
    }

    async update(
        id: number,
        newValue: ContractDto,
    ): Promise<Contract | null> {
        const contract = await this.contractRepository.findOneOrFail(id);
        if (!contract.id) {
            throw new NotFoundException();
        }
        await this.contractRepository.update(id, newValue);
        return await this.contractRepository.findOne(id);
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.contractRepository.delete(id);
    }
}
