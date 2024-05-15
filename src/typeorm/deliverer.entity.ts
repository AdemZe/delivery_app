import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Informations } from 'src/interface/Informations.inetrface';
import { DelivererDto } from 'src/livreur/dto/deliverer.dto';
import { delivererStatus } from 'src/livreur/valueobjects/delivererStatus.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DelivererEntity {
  @PrimaryGeneratedColumn({
    name: 'id_deliverer',
  })
  id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @Column({
    nullable: true,
    name: 'first_name',
  })
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @Column({
    nullable: true,
    name: 'last_name',
  })
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @IsEmail()
  @Column({
    nullable: false,
    unique: true,
    name: 'email',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @MinLength(5)
  @Column({
    nullable: true,
    name: 'password',
  })
  password: string;

  @Column({
    type: 'enum',
    enum: delivererStatus,
    default: delivererStatus.Active,
    name: 'status_deliverer',
  })
  status: delivererStatus;

  @Column({
    type: 'jsonb',
    nullable: true,
    name: 'informations_personnels',
  })
  informations: Informations[];

  @Column({
    default: true,
    name: 'isAvailable',
  })
  isAvailable: boolean;

  @Column({
    name: 'nb_Livraisons',
  })
  nbLivraisonsReussies: number = 0;

  @Column({
    default: new Date(),
    name: 'created_At',
  })
  createdAt: Date;

  toDelivererDto() {
    return new DelivererDto(this);
  }
}
