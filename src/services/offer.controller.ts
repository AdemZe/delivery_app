import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OffersService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { UserDto } from 'src/users/dto/user.dto';

@UseGuards(AuthGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get('/GetusersAuthentifier')
  async getUserAuthentifer(
    @Req() req: Request & { user: any },
  ): Promise<UserDto> {
    const user1 = req ; // Récupérer l'utilisateur à partir de la requête
    const user = req.user; // Récupérer l'utilisateur à partir de la requête
    // Utilisez user comme vous le souhaitez
    console.log(user1);
    return user;
  }

  @Get()
  async getAllOffers() {
    return await this.offersService.getAllOffers();
  }

  @Get(':id')
  async findOffreById(@Param('id', ParseIntPipe) id: number) {
    return await this.offersService.getOfferById(id);
  }

  @Post()
  async createOffer(
    @Body() createOfferDto: CreateOfferDto,
    @Req() req: Request & { user: any },
  ) {
    return await this.offersService.createOffer(createOfferDto, req.user);
  }

  @Patch(':id')
  async updateOffer(
    @Body() updateOfferDto: UpdateOfferDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.offersService.updateOffer(updateOfferDto, id);
  }

  @Delete(':id')
  async deleteOffer(@Param('id', ParseIntPipe) id: number) {
    return await this.offersService.removeOffer(id);
  }
}
