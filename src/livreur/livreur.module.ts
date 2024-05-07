import { Module } from '@nestjs/common';
import { LivreurService } from './livreur.service';
import { LivreurController } from './livreur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivreurEntity } from 'src/typeorm/livreur.entity';

@Module({
  imports:[TypeOrmModule.forFeature([LivreurEntity])],
  controllers: [LivreurController],
  providers: [LivreurService],
})
export class LivreurModule {}
