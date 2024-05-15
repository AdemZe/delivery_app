import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DelivererEntity } from 'src/typeorm/deliverer.entity';
import { Repository } from 'typeorm';
import { CreateDelivererDto } from './dto/create-deliverer.dto';
import { UpdateDelivererDto } from './dto/update-deliverer.dto';
import { delivererStatus } from './valueobjects/delivererStatus.enum';
import { error } from 'console';
import { DelivererDto } from './dto/deliverer.dto';

@Injectable()
export class DelivererService {
  constructor(
    @InjectRepository(DelivererEntity)
    private readonly delivRepo: Repository<DelivererEntity>,
  ) {}

  async getAllDeliverer():Promise<DelivererDto[]> {
    return await this.delivRepo.find();
  }




async getDelivererById(id : number ):Promise <DelivererDto>   {

    const deliveryPerson = await this.delivRepo.findOneBy({id}) 
    if (! deliveryPerson ){
        throw new NotFoundException (`Livreur avec id =${id} non trouvé`)
    }else {
        //const {id,password,...liv}=deliveryPerson ;  
        //return liv ;
        return deliveryPerson.toDelivererDto()
    }

}



async createDeliverer(createDelivererDto : CreateDelivererDto):Promise<DelivererDto> {
    
    const deliveryPerson = await this.delivRepo.createQueryBuilder("livreur")
    .where( " livreur.email = :email " , {email:createDelivererDto.email })
    .getOne()
    
    
    if (deliveryPerson){
        throw new error (" livreur deja existe ")
    }else{
    const liv = await this.delivRepo.create({...createDelivererDto})
    await this.delivRepo.save(liv)
    //const {id,password,...newLivreur}=liv 
    //return     newLivreur ;
    return liv.toDelivererDto();
    }
}


async  deleteDeliverer(id :number ){
    const deliveryPerson = this.getDelivererById(id)
    // if (!deliveryPerson){
    //    throw new NotFoundException(" Livreur not existe  ")
    //}
    try{
        await this.delivRepo.delete(id);
        return "Suppression avec succes";
    }catch(e){
        //throw new Error (" un erreur se produit lors de la suppression ");
        throw new InternalServerErrorException(" un erreur se produit lors de la suppression ")
    }

}
    
        
async updateDeliverer ( id:number, updateDelivererDto : UpdateDelivererDto):Promise<DelivererDto>{
    const deliveryPerson = await this.delivRepo.createQueryBuilder("livreur")
    .where(" livreur.id = :id  ",{id})
    .getOne()

    if(!deliveryPerson){
        throw new NotFoundException(" Livreur not exsite to update ");
    }else{
        try {
            const updateLiv = await this.delivRepo.preload ({
                id , 
                ...updateDelivererDto
            })
            await this.delivRepo.save(updateLiv);
            //const {password, ...liv}=updateLiv
            //return liv ;
            return updateLiv.toDelivererDto()

        }catch(e){
            //throw new Error ( "Un erreur se produit aucour de la modification ");
            throw new InternalServerErrorException(" Un erreur se produit aucour de la modification  ")

        }
        
    }

}


async activeDeliverer(id:number){
    const deliveryPerson = await this.delivRepo.createQueryBuilder("livreur")
    .where("livreur.id = :id " , {id:id})
    .getOne()
    if (!deliveryPerson){
        throw new NotFoundException(" Livreur not exsite ");
    }else{
        try{
        deliveryPerson.status=delivererStatus.Active ;
        await this.delivRepo.save(deliveryPerson);
        return `livreur avec id = ${id} sera active `;
        }catch(e){
        //throw new Error(" Un erreur se produit au cour de déactivation de livreur ");
        throw new InternalServerErrorException("Un erreur se produit au cour de déactivation de livreur ")
        }
            
        

    }
}

async deactivateDeliverer(id:number){

    const deliveryPerson = await this.delivRepo.createQueryBuilder("livreur")
    .where("livreur.id = :id " , {id:id})
    .getOne()
    if (!deliveryPerson){
        throw new NotFoundException(" Livreur not exsite ");
    }else{
        try{
        deliveryPerson.status=delivererStatus.Deactive ;
        await this.delivRepo.save(deliveryPerson);
        return `livreur avec id = ${id} sera deactive `;
        }catch(e){
            //throw new Error(" Un erreur se produit au cour de déactivation de livreur ");
            throw new InternalServerErrorException("Un erreur se produit au cour de déactivation de livreur ")

        }

    } 

}

async isAvailableDeliverer(id:number){
    const deliveryPerson = await this.delivRepo.createQueryBuilder("livreur")
    .where("livreur.id = :id " , {id:id})
    .getOne()
    if (!deliveryPerson){
        throw new NotFoundException(" Livreur not exsite ");
    }else{
        try{
        deliveryPerson.isAvailable = true ;
        await this.delivRepo.save(deliveryPerson);
        return `livreur avec id = ${id} sera disponible `;
        }catch(e){
            //throw new Error(" Un erreur se produit ");
            throw new InternalServerErrorException("Un erreur se produit");
        }

    } 
    
}


async isNotAvailableDeliverer(id:number){
    const deliveryPerson = await this.delivRepo.createQueryBuilder("livreur")
    .where("livreur.id = :id " , {id:id})
    .getOne()
    if (!deliveryPerson){
        throw new NotFoundException(" Livreur not exsite ");
    }else{
        try{
        deliveryPerson.isAvailable = false ;
        await this.delivRepo.save(deliveryPerson);
        return `livreur avec id = ${id} sera non disponible `;
        }catch(e){
            //throw new Error(" Un erreur se produit ");
            throw new InternalServerErrorException("Un erreur se produit");
        }

    } 
    
    
}















}