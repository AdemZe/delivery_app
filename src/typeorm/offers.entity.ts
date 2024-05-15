import { IsNotEmpty, IsString } from 'class-validator';
import { OfferDto } from 'src/services/dto/offer.dto';
import {
  Column,
  Decimal128,
  Entity,
  NumericType,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OfferEntity {
  @PrimaryGeneratedColumn({
    name: 'id_offer',
  })
  id: number;

  @IsNotEmpty()
  @Column({
    type: 'jsonb',
    name: 'location',
  })
  locationCoordination: {
    latitude: number;
    longitude: number;
  };

  @IsString()
  @Column({
    name: 'item_delivered',
  })
  itemDelivered: string;

  @IsNotEmpty()
  @Column('numeric', {
    //precision:5,
    //scale:2,
    nullable: true,
  })
  deliveryPrice: number;

  toOfferDto() {
    return new OfferDto(this);
  }
}
