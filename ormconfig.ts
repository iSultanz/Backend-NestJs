import * as dotenv from 'dotenv';
dotenv.config();
export = {
  type: 'postgres',
  host: 'localhost',
  port: '5432',
  username: 'postgres',
  password: '123456',
  database: 'test_migration',

  entities: ['dist/src/**/*.entity{.ts,.js}'],
  migrations: ["src/db/migrations/*{.js,.ts}"],
  migrationsTableName: 'migration',
  migrationsRun: true,
  synchronize: false,
  cli: {
    migrationsDir: 'src/db/migrations',
    //           migrationsDir: 'src/db/migrations'

  },
  extra: {
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
  },
};