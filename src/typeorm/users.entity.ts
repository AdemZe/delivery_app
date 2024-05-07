import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from 'src/autorization/role';
import { Informations } from 'src/interface/Informations.inetrface';
import { userStatus } from 'src/users/valueobjects/user-Status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  firstname: string;

  @Column({
    nullable: true,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  lastname: string;

  @Column({
    nullable: true,
    unique: true,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @IsEmail()
  email: string;

  @Column({
    nullable: true,
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @Column({
    type: 'enum',
    enum: userStatus,
    default: userStatus.Active,
  })
  status: userStatus;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @Column({ type: 'jsonb', nullable: true })
  informations: Informations[];
}
