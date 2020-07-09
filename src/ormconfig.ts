import {ConnectionOptions} from 'typeorm';

const config: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'placementdb',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],

  synchronize: false,

  migrationsRun: true,
  logging: true,
  logger: 'file',

  migrations: ['migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'migrations',
  },
};

export = config;