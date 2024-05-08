import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { AuthServiceLivreur } from './auth.service';

@Controller('auth/livreur')
export class AuthControllerLivreur {
constructor(
  private readonly authServiceLivreur: AuthServiceLivreur , 

) {}




@Post("login")
async signIn( @Body()  signin : LoginDto  ){

  return await this.authServiceLivreur.signin(signin.email,signin.password) 
}



@Get('verify')
async verifyToken(@Query('token') token: string) {
  return await this.authServiceLivreur.verifyToken(token);
}





}
