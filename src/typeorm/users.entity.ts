import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from 'src/autorization/role';
import { Informations } from 'src/interface/Informations.inetrface';
import { UserDto } from 'src/users/dto/user.dto';
import { userStatus } from 'src/users/valueobjects/user-Status.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { JobEntity } from './job.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn({
    name: 'id_user',
  })
  id: number;

  @Column({
    nullable: true,
    name: 'first_name',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  firstname: string;

  @Column({
    nullable: true,
    name: 'last_name',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  lastname: string;

  @Column({
    nullable: true,
    unique: true,
    name: 'email',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @IsEmail()
  email: string;

  @Column({
    nullable: true,
    name: 'password',
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @Column({
    type: 'enum',
    enum: userStatus,
    default: userStatus.Active,
    name: 'status_user',
  })
  status: userStatus;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
    name: 'role_user',
  })
  role: Role;

  @Column({
    type: 'jsonb',
    name: 'informations_personnels',
  })
  informations: Informations[];

  @Column({
    nullable: true,
    default: new Date(),
    name: 'created_At',
  })
  createdAt: Date;

   toUserDto() {
    return new UserDto(this);
  }


  @OneToMany(()=>JobEntity , job=>job.owner , { onDelete: 'CASCADE'})
  jobs:JobEntity[]





}

