import { JobEntity } from "src/typeorm/job.entity";
import { UserEntity } from "src/typeorm/users.entity";



export class JobDto{
    id: number;
    jobName: string;
    city: string;
    address: string;
    phoneNumber: string;
    jobLocation:{
        latitude: number;
        longitude: number;
    };
    owner: UserEntity;




 constructor( job:JobEntity ){

    this.id=job.id;
    this.jobName=job.jobName;
    this.city=job.city;
    this.address=job.address;
    this.phoneNumber=job.phoneNumber;
    this.jobLocation=job.jobLocation;
    this.owner=job.owner;
   

 }





}