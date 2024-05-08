import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { jwtConstants } from '../constantes';
import { InjectRepository } from '@nestjs/typeorm';
import { LivreurEntity } from 'src/typeorm/livreur.entity';
import { LivreurService } from 'src/livreur/livreur.service';

@Injectable()
export class AuthServiceLivreur {
  constructor(

    @InjectRepository(LivreurEntity)
    private readonly livRepo: Repository<LivreurEntity>,
    private jwtService: JwtService,
    //private livreurService: LivreurService ,
  ) {}

  async signin(email: string, password: string) {
    const livreur = await this.livRepo
      .createQueryBuilder('livreur')
      .where('livreur.email = :email', { email: email })
      .getOne();
    if (!livreur) {
      throw new NotFoundException(' Utilisateur non trouvé ');
    } else {
      if (livreur.password === password) {
        const payload = {
          email: livreur.email,
          sub: livreur.id,
          username: livreur.firstname,
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
