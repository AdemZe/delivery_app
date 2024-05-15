import { Module } from '@nestjs/common';
import { DelivererService } from './deliverer.service';
import { DelivererController } from './deliverer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DelivererEntity } from 'src/typeorm/deliverer.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([DelivererEntity]),UsersModule],
  controllers: [DelivererController],
  providers: [DelivererService],
  exports:[TypeOrmModule,DelivererService],
})
export class DelivererModule {}
