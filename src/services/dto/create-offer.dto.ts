import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsString()
  itemDelivered: string;

  @IsNotEmpty()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  deliveryPrice: number;

  @IsNotEmpty()
  locationCoordination: {
    latitude: number;

    longitude: number;
  };
}
