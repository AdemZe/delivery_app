import { Module } from '@nestjs/common';
import { OffersService } from './offer.service';
import { OffersController } from './offer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfferEntity } from 'src/typeorm/offers.entity';
import { UsersModule } from 'src/users/users.module';
import { DelivererModule } from 'src/livreur/deliverer.module';
import { DelivererService } from 'src/livreur/deliverer.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports:[ 
  TypeOrmModule.forFeature([OfferEntity]) ,
  UsersModule,
  DelivererModule,

  ],
  controllers: [OffersController],
  providers: [OffersService,UsersService,DelivererService],

})
export class OffersModule {}
