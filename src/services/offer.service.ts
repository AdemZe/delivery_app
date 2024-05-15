import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DelivererService } from 'src/livreur/deliverer.service';
import { DelivererEntity } from 'src/typeorm/deliverer.entity';
import { OfferEntity } from 'src/typeorm/offers.entity';
import { UserEntity } from 'src/typeorm/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { OfferDto } from './dto/offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(OfferEntity)
    private readonly offerRepo: Repository<OfferEntity>,

    @InjectRepository(UserEntity)
    private readonly usersRepo: Repository<UserEntity>,

    @InjectRepository(DelivererEntity)
    private readonly delivRepo: Repository<DelivererEntity>,

    private userService: UsersService,
    private delivererService: DelivererService,
  ) {}

  async getAllOffers(): Promise<OfferDto[]> {
    return await this.offerRepo.find();
  }

  async getOfferById(id: number): Promise<OfferDto> {
    console.log('id =', id);
    const offer = await this.offerRepo.findOneBy({ id });
    if (!offer) {
      throw new NotFoundException(`Offer with id= ${id} not available `);
    } else {
      return offer;
    }
  }

  async createOffer(
    createOfferDto: CreateOfferDto,
    req: Request & { user: any },
  ): Promise<OfferDto> {
    const user = req.user;
    const offer = this.offerRepo.create({
      ...createOfferDto,
    });
    await this.offerRepo.save(offer);
    return offer.toOfferDto();
  }

  async removeOffer(id: number): Promise<OfferDto> {
    const offer = this.getOfferById(id);
    if (offer) {
      try {
        await this.offerRepo.delete({ id });
        return offer;
      } catch (e) {
        throw new InternalServerErrorException('un erreur se produit ');
      }
    }
  }

  async updateOffer(
    updateOfferDto: UpdateOfferDto,
    id: number,
  ): Promise<OfferDto> {
    const offer = this.getOfferById(id);
    if (offer) {
      const offerUpdated = await this.offerRepo.preload({
        id,
        ...updateOfferDto,
      });
      await this.offerRepo.save(offerUpdated);
      return offerUpdated.toOfferDto();
    }
  }
}
