import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from '../user/user.entity';
import { Type } from 'class-transformer';
import { ContractEntity } from '../contract/contract.entity';

@Entity('user_contracts')
export class UserContract {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  contractId: number;

  @ManyToOne((type) => User)
  @Type((t) => User)
  user: User;

  @ManyToOne((type) => ContractEntity)
  @Type((t) => ContractEntity)
  license: ContractEntity;

  @Column()
  yearsActive: number;
}