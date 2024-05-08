import { Body, Controller, Get, Post, Req, UseGuards,  } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';


@UseGuards(AuthGuard)
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}



    @Get()
    async getUserAuthentifer(@Req() req: Request & { user: any }) {
      const user1 = req     // Récupérer l'utilisateur à partir de la requête
      const user = req.user     // Récupérer l'utilisateur à partir de la requête
      // Utilisez user comme vous le souhaitez
      console.log(user1)
    }
    @Get()
    async getAllServices() {
      return await this.servicesService.returnAllServices()
    }

    @Post()
    async createService(@Body() createServiceDto: CreateServiceDto,
    @Req() req: Request & { user: any }){
      return await this.servicesService.creerUnService(createServiceDto, req.user);
    }


  
}
