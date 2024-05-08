import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from 'src/typeorm/service.entity';
import { UsersModule } from 'src/users/users.module';
import { LivreurModule } from 'src/livreur/livreur.module';
import { LivreurService } from 'src/livreur/livreur.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports:[   TypeOrmModule.forFeature([ServiceEntity]) ,
  UsersModule,
  LivreurModule,

  ],
  controllers: [ServicesController],
  providers: [ServicesService,UsersService,LivreurService],

})
export class ServicesModule {}
