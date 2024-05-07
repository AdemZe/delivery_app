import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/typeorm/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { jwtConstants } from './constantes';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    //private userservice: UsersService,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async signin(email: string, password: string) {
    const user = await this.userRepo
      .createQueryBuilder('users')
      .where('users.email = :email', { email: email })
      .getOne();
    if (!user) {
      throw new NotFoundException(' Utilisateur non trouvé ');
    } else {
      if (user.password === password) {
        const payload = {
          email: user.email,
          sub: user.id,
          username: user.firstname,
        };
        return {
          access_token: await this.jwtService.signAsync(payload, {
            secret: jwtConstants.secret,
          }),
        };
      }
    }
  }



  async verifyToken(token) {
    try {
      await this.jwtService.verify(token, {
        secret: jwtConstants.secret,
      });
      return {
        access_token: token,
      };
    } catch (e) {
      console.log(e.message);
      throw new UnauthorizedException();
    }
  }






















}
