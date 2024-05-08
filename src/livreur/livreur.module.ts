import { Module } from '@nestjs/common';
import { LivreurService } from './livreur.service';
import { LivreurController } from './livreur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivreurEntity } from 'src/typeorm/livreur.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([LivreurEntity]),UsersModule],
  controllers: [LivreurController],
  providers: [LivreurService],
  exports:[TypeOrmModule,LivreurService],
})
export class LivreurModule {}
