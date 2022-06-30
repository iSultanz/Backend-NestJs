import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module"; 
import { ConfigModule, ConfigService } from "@nestjs/config";
import { configValidationSchema } from "./config.schema";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksModule } from "./modules/tasks/tasks.module"; 
import { MulterModule } from "@nestjs/platform-express";
import { UserAvatarModule } from "./modules/user-avatar/user-avatar.module";



@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      isGlobal: true,
      validationSchema: configValidationSchema
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: ['./**/*.entity{.ts,.js}'],
          synchronize: false,
          migrationsRun: true,
          migrations: ["./db/migrations/**/*{.js,.ts}"],
          cli: {
            migrationsDir: 'src/db/migrations'
          },
        }),
    }),
    AuthModule,
    TasksModule,
    MulterModule.register({ dest: '../upload'}),
    UserAvatarModule,
  ],
})
export class AppModule { }


