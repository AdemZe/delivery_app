import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DelivererModule } from './livreur/deliverer.module';
import { AuthModule } from './auth/auth.module';
import { OffersModule } from './services/offer.module';
import { JobModule } from './job/job.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';

// pour permet de lire le contenus de variables d'environements
//faire instance de configService
dotenv.config();

@Module({
  imports: [
    UsersModule,
    /* TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username:"postgres",
      password:"1234567",
      database:"my_db",
      autoLoadEntities: true,
      entities: [__dirname + "/entity/*.ts"],
      synchronize: true ,
  */
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      entities: [__dirname + '/entity/*.ts'],
      synchronize: true,
    }),
    DelivererModule,
    AuthModule,
    OffersModule,
    JobModule,

    ConfigModule.forRoot({
      isGlobal: true, // rend le module global
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
