import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Informations } from "src/interface/Informations.inetrface";


export class CreateLivreurDto{

    
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    firstname: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(20)
    lastname: string;


    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    @MinLength(5)
    password: string ;

    @IsNotEmpty()
    informations: Informations[];






}