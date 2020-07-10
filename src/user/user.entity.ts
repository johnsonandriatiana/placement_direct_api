
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import * as  bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';
import { Exclude, Type } from 'class-transformer';
import { UserContract } from '../users-contracts/user-contract.entity';
import { Contract } from 'src/contract/contract.entity';
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({
        unique: true,
    })
    username: string;

    @Column({
        unique: true,
    })
    @IsEmail()
    email: string;

    @Column()
    phone: string;


    @Exclude()
    @Column()
    password: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;
    
    @ManyToMany(() => Contract)
    @JoinTable()
    public contracts: Contract[];

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }
}