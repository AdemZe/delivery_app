import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Informations } from 'src/interface/Informations.inetrface';
import { livStatus } from 'src/livreur/valueobjects/livStatus.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LivreurEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @Column({
    nullable: true,
  })
  firstname: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @Column({
    nullable: true,
  })
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @IsEmail()
  @Column({
    nullable: false,
    unique: true,
  })
  email: string;


  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @MinLength(5)
  @Column({
    nullable: true,
  })
  password: string ;


  @Column({
    type: 'enum',
    enum: livStatus,
    default: livStatus.Active,
  })
  status: livStatus;

  @Column({ type: 'jsonb', nullable: true })
  informations: Informations[];

  @Column({ default: true })
  isAvailable: boolean;

  @Column()
  nbLivraisonsReussies: number = 0;
}
