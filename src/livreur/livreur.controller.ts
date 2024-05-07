import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { LivreurService } from './livreur.service';
import { CreateLivreurDto } from './dto/create-livreur.dto';
import { UpdateLivreurDto } from './dto/update-livreur.dto';

@Controller('livreur')
export class LivreurController {
  constructor(private readonly livreurService: LivreurService) {}

  @Get()
  async getAllLivreur() {
    return await this.livreurService.getAllLivreur();
  }

  @Get(":id")
  async GetLivreurById( @Param("id", ParseIntPipe) id: number ){
    return await this.livreurService.returnLivreurById(id);
  }

  @Post()
  async createLivreur( @Body() createLivreurDto : CreateLivreurDto ){
    return this.livreurService.creerUnLivreur(createLivreurDto);
  }

  @Delete(":id")
  async removeLivreur( @Param("id",ParseIntPipe ) id:number ){
    return await this.livreurService.deleteLivreur(id);
  }


  @Patch(":id")
  async updateLivreur ( @Param("id",ParseIntPipe) id:number , @Body()
      updateLivreurDto : UpdateLivreurDto 
  ){
    return await this.livreurService.modifierLivreur(id,updateLivreurDto);
    
  }


  @Patch("/activate/:id")
  async activeLivreur(@Param("id", ParseIntPipe) id : number ){
    return await this.livreurService.activeLiv(id);
  }

  @Patch("/deactivate/:id")
  async deactivateLivreur(@Param("id",ParseIntPipe) id: number ){
    return await this.livreurService.deactivateLiv(id);
  }


  @Patch("/available/:id")
  async isAvailableLivreur(@Param("id", ParseIntPipe) id:number ){
    return await this.livreurService.isAvailableLiv(id);

  }

  @Patch("/notavailable/:id")
  async isNotAvailableLivreur(@Param("id", ParseIntPipe) id:number ){
    return await this.livreurService.isNotAvailableLiv(id);

  }





}
