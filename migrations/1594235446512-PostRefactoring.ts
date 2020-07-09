import {MigrationInterface, QueryRunner, Repository} from "typeorm";
import { plainToClass } from "class-transformer";
import { ClassType } from "class-transformer/ClassTransformer";
import { User } from "src/user/user.entity";

export class PostRefactoring1594235446512 implements MigrationInterface {
    name = 'PostRefactoring1594235446512'
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
        await queryRunner.query(`CREATE TABLE "contract_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "content" character varying NOT NULL, "price" integer NOT NULL, "isActive" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), CONSTRAINT "PK_7575db328609620b41aa3ada0c6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "isArchive" boolean NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(6), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_contracts" ("userId" integer NOT NULL, "contractId" integer NOT NULL, "yearsActive" integer NOT NULL, "licenseId" integer, CONSTRAINT "PK_5da9b51a04ce3ac8b32e957594a" PRIMARY KEY ("userId", "contractId"))`);
        await queryRunner.query(`ALTER TABLE "user_contracts" ADD CONSTRAINT "FK_325717ca7462da7684a4e2b8ebd" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_contracts" ADD CONSTRAINT "FK_c534809a03df982e472f35695ff" FOREIGN KEY ("licenseId") REFERENCES "contract_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

        const { connection } = queryRunner;

        const userRepo = connection.getRepository(User);
        console.log('userRepo', userRepo)
        
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
        await queryRunner.query(`ALTER TABLE "user_contracts" DROP CONSTRAINT "FK_c534809a03df982e472f35695ff"`);
        await queryRunner.query(`ALTER TABLE "user_contracts" DROP CONSTRAINT "FK_325717ca7462da7684a4e2b8ebd"`);
        await queryRunner.query(`DROP TABLE "user_contracts"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "contract_entity"`);
    }

}
