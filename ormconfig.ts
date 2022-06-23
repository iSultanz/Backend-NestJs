// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// @Module({
//   imports: [
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         type: 'postgres',
//         host: configService.get('DB_HOST'),
//         port: configService.get('DB_PORT'),
//         username: configService.get('DB_USERNAME'),
//         password: configService.get('DB_PASSWORD'),
//         database: configService.get('DB_DATABASE'),
//         entities: ['./*.entity{.ts,.js}'],
//         autoLoadEntities: true,
//         synchronize: false,
//         migrations: ["dist/src/db/migrations/**/*{.js,.ts}"],
//         cli: {
//           migrationsDir: 'src/db/migrations'
//         },
//       }),
//     }),
//   ],
// })
// export class DatabaseModule {}

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