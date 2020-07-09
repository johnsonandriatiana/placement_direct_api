import { Module } from '@nestjs/common';
import { ContractController } from './contract.controller';
import { ContractService } from './contract.service';
import { ContractEntity } from './contract.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ContractEntity])],
  controllers: [ContractController],
  providers: [ContractService],
  exports: [ContractService]
})
export class ContractModule {}
