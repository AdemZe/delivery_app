import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class LoginDto {

    
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @IsEmail()
  email: string;


  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @MinLength(5)
  password: string;

  
}