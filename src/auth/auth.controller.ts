import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth/users')
export class AuthController {
constructor(
  private readonly authService: AuthService , 

) {}




@Post("login")
async signIn( @Body()  signin : LoginDto  ){

  return await this.authService.signin(signin.email,signin.password) 
}



@Get('verify')
async verifyToken(@Query('token') token: string) {
  return await this.authService.verifyToken(token);
}





}
