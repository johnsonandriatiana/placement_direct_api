import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, DeleteResult, In } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { ContractService } from 'src/contract/contract.service';
import { UserContractDto } from './dto/user-contract.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private contractService: ContractService,
    ) { }

    async create(userDto: UserDto): Promise<User> {

        const { firstName, lastName, username, password, email, phone } = userDto;
        const userInDb = await this.userRepository.findOne({
            where: { username }
        });
        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        const emailInDb = await this.userRepository.findOne({
            where: { email }
        });
        if (emailInDb) {
            throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
        }

        const user: User = await this.userRepository.create({ firstName, lastName, username, password, email, phone });
        return await this.userRepository.save(user);

    }

    async findAll(): Promise<User[]> {
        const data = await this.userRepository.find();      
        return data;
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new NotFoundException();
        }
        return user;
    }
    async findByParam(options?: object): Promise<User> {
        const data = await this.userRepository.findOne(options);
        return data;
    }

    async remove(id: string): Promise<void> {
        await await this.userRepository.delete(id);
    }

    async update(
        id: number,
        newValue: UserDto,
    ): Promise<User | null> {
        const user = await this.userRepository.findOneOrFail(id);
        if (!user.id) {
            throw new NotFoundException();
        }
        await this.userRepository.update(id, newValue);
        return await this.userRepository.findOne(id);
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }

    async createContractforUser(usercontract: UserContractDto): Promise<any> {
        let contracts = await this.contractService.findAllByIds(usercontract.contractIds);
        const user = await this.userRepository.findOneOrFail(usercontract.userId);
        user.contracts = [...contracts]
        await this.userRepository.save(user);
    }

    async getUserContractById(id: string) {
        const user = await this.userRepository.findOne(id, { relations: ['contracts'] });
        if (!user) {
            throw new NotFoundException();
        }
        return user;
    }
}
