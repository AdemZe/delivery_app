import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { AuthServiceDeliverer } from './auth.service';

@Controller('auth/deliverer')
export class AuthControllerDeliverer {
constructor(
  private readonly authServiceDeliverer: AuthServiceDeliverer , 

) {}


@Post("login")
async signIn( @Body()  signin : LoginDto  ){

  return await this.authServiceDeliverer.signin(signin.email,signin.password) 
}



@Get('verify')
async verifyToken(@Query('token') token: string) {
  return await this.authServiceDeliverer.verifyToken(token);
}





}
