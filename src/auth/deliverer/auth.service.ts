import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { jwtConstants } from '../constantes';
import { InjectRepository } from '@nestjs/typeorm';
import { DelivererEntity } from 'src/typeorm/deliverer.entity';
import { DelivererService } from 'src/livreur/deliverer.service';

@Injectable()
export class AuthServiceDeliverer {
  constructor(

    @InjectRepository(DelivererEntity)
    private readonly delivRepo: Repository<DelivererEntity>,
    private jwtService: JwtService,
    //private livreurService: LivreurService ,
  ) {}

  async signin(email: string, password: string) {
    const deliveryPerson = await this.delivRepo
      .createQueryBuilder('delivery')
      .where('delivery.email = :email', { email: email })
      .getOne();
    if (!deliveryPerson) {
      throw new NotFoundException(' Utilisateur non trouvé ');
    } else {
      if (deliveryPerson.password === password) {
        const payload = {
          email: deliveryPerson.email,
          sub: deliveryPerson.id,
          username: deliveryPerson.firstname,
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
