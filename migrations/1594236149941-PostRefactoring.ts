import {MigrationInterface, QueryRunner, Repository} from "typeorm";
import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import { User } from "src/user/user.entity";

export class PostRefactoring1594236149941 implements MigrationInterface {
    name = 'PostRefactoring1594236149941'

    private save<T>(repo: Repository<T>, data: Partial<T>[]): Promise<T[]> {
        return repo.save(
          data.map((partial: Partial<T>) =>
            plainToClass<any, any>(repo.target as ClassType<T>, partial, {
              ignoreDecorators: true,
            }),
          ),
        );
      }

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contract_entity" ADD "price" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "contract_entity" ADD "isActive" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isArchive" boolean NOT NULL`);

        const { connection } = queryRunner;

        const userRepo = connection.getRepository(User);
        
        // companies
        await this.save(userRepo, [
            {
                firstName: 'string',
                lastName: 'string',
                username: 'string',
                email: 'string@gmail.com',
                phone: '06 12 38 28 86',
                password: 'string',
                isArchive: false
            }
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isArchive"`);
        await queryRunner.query(`ALTER TABLE "contract_entity" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "contract_entity" DROP COLUMN "price"`);
    }

}
