import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthServiceUser } from './auth.service';
import { LoginDto } from '../dto/login.dto';

@Controller('auth/users')
export class AuthControllerUser {
constructor(
  private readonly authServiceUser: AuthServiceUser , 

) {}




@Post("login")
async signIn( @Body()  signin : LoginDto  ){

  return await this.authServiceUser.signin(signin.email,signin.password) 
}



@Get('verify')
async verifyToken(@Query('token') token: string) {
  return await this.authServiceUser.verifyToken(token);
}





}
