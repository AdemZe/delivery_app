import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './users.entity';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { JobDto } from 'src/job/dto/job.dto';

@Entity()
export class JobEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @Column({
    name: 'job_name',
  })
  jobName: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  @Column({
    name: 'city',
  })
  city: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  @Column({
    name: 'address',
  })
  address: string;

  @IsString()
  @IsNotEmpty()
  @Column({
    name: 'phone_number',
  })
  phoneNumber: string;

  @IsNotEmpty()
  @Column({
    type: 'jsonb',
    name: 'job_location',
  })
  jobLocation:{
    latitude: number;
    longitude: number;
  };



  toJobDto(){
    return new JobDto(this);
  }



  @ManyToOne(() => UserEntity, (user) => user.jobs)
  owner: UserEntity;





}

