import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { DelivererService } from './deliverer.service';
import { CreateDelivererDto } from './dto/create-deliverer.dto';
import { UpdateDelivererDto } from './dto/update-deliverer.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('deliverer')
export class DelivererController {
  constructor(private readonly delivererService: DelivererService) {}

  @Get()
  async getAllDeliverer() {
    return await this.delivererService.getAllDeliverer();
  }

  @Get(":id")
  async getDelivererById( @Param("id", ParseIntPipe) id: number ){
    return await this.delivererService.getDelivererById(id);
  }

  @Post()
  async createDeliverer( @Body() createDelivererDto : CreateDelivererDto ){
    return this.delivererService.createDeliverer(createDelivererDto);
  }

  @Delete(":id")
  async removeDeliverer( @Param("id",ParseIntPipe ) id:number ){
    return await this.delivererService.deleteDeliverer(id);
  }


  @Patch(":id")
  async updateDeliverer ( @Param("id",ParseIntPipe) id:number , @Body()
      updateDelivererDto : UpdateDelivererDto 
  ){
    return await this.delivererService.updateDeliverer(id,updateDelivererDto);
    
  }


  @Patch("/activate/:id")
  async activeDeliverer (@Param("id", ParseIntPipe) id : number ){
    return await this.delivererService.activeDeliverer(id);
  }

  @Patch("/deactivate/:id")
  async deactivateDeliverer (@Param("id",ParseIntPipe) id: number ){
    return await this.delivererService.deactivateDeliverer(id);
  }


  @Patch("/available/:id")
  async isAvailableDeliverer(@Param("id", ParseIntPipe) id:number ){
    return await this.delivererService.isAvailableDeliverer(id);

  }

  @Patch("/notavailable/:id")
  async isNotAvailableDeliverer (@Param("id", ParseIntPipe) id:number ){
    return await this.delivererService.isNotAvailableDeliverer(id);

  }





}
