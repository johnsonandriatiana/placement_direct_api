import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, DeleteResult } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
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
        const data = await this.userRepository.findOne(id);
        return data;
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

        }
        await this.userRepository.update(id, newValue);
        return await this.userRepository.findOne(id);
    }

    public async delete(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }
}
