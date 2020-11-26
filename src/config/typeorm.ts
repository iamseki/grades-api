import { ConnectionOptions } from 'typeorm';
import * as path from 'path';

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const config: ConnectionOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE || 'grades-api',
  entities: ['dist/modules/**/entities/*.entity{.ts,.js}'],

  // We are using migrations, synchronize should be set to false.
  synchronize: false,

  // Do not run migrations automatically,
  // you can disable this if you prefer running migration manually.
  migrationsRun: false,

  // A file named ormlogs.log will be generated in the root folder.
  logging: true,
  logger: 'file',

  // Allow both start:prod and start:dev to use migrations
  // __dirname is either dist or src folder, meaning either
  // the compiled js in prod or the ts in dev.
  migrations: [path.join(__dirname, '..', 'database/migrations/**/*{.ts,.js}' )],
  cli: {
    // Location of migration should be inside src folder
    // to be compiled into dist/ folder.
    migrationsDir: 'src/database/migrations',
  },
};

// If you need to debug typeorm cli you can do it here
console.log(config.migrations)

export = config;
