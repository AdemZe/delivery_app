import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";



export class CreateJobDto{

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    jobName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(200)
    city: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(200)
    address: string;

    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @IsNotEmpty()
    jobLocation: {
        latitude: number;
        longitude: number;
    };

    



    
}