import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivreurModule } from './livreur/livreur.module';
import { AuthModule } from './auth/auth.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [ UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username:"postgres",
      password:"1234567",
      database:"my_db",
      autoLoadEntities: true,
      synchronize: true,
    }),
    LivreurModule,
    AuthModule,
    ServicesModule, 
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
