import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LivreurEntity } from 'src/typeorm/livreur.entity';
import { Repository } from 'typeorm';
import { CreateLivreurDto } from './dto/create-livreur.dto';
import { UpdateLivreurDto } from './dto/update-livreur.dto';
import { livStatus } from './valueobjects/livStatus.enum';

@Injectable()
export class LivreurService {
  constructor(
    @InjectRepository(LivreurEntity)
    private readonly livrepo: Repository<LivreurEntity>,
  ) {}

  async getAllLivreur() {
    return await this.livrepo.find();
  }




async returnLivreurById(id : number ):Promise <Partial <LivreurEntity> >  {

    const livreur = await this.livrepo.findOneBy({id}) 
    if (!livreur){
        throw new NotFoundException (`Livreur avec id =${id} non trouvé`)
    }else {
        const {id,password,...liv}=livreur ;  
        return liv ;
    }

}



async creerUnLivreur(createLivreurDto : CreateLivreurDto):Promise <Partial<LivreurEntity>>{
    
    const livreur = await this.livrepo.createQueryBuilder("livreur")
    .where( " livreur.email = :email " , {email:createLivreurDto.email })
    .getOne()
    
    
    if (livreur){
        throw new NotFoundException(" livreur deja existe ")
    }else{
    const liv = await this.livrepo.create({...createLivreurDto})
    await this.livrepo.save(liv)
    const {id,password,...newLivreur}=liv 
    return     newLivreur ;
    }
}


async  deleteLivreur(id :number ){
    const liv = this.returnLivreurById(id)
    if (!liv){
        throw new NotFoundException(" Livreur not existe  ")
    }
    try{
        await this.livrepo.delete(id);
        return "Suppression avec succes";
    }catch(e){
        throw new Error (" un erreur se produit lors de la suppression ");
    }

}
    
        
async modifierLivreur ( id:number, updateLivreurDto : UpdateLivreurDto ){
    const livreur= await this.livrepo.createQueryBuilder("livreur")
    .where(" livreur.id = :id  ",{id})
    .getOne()

    if(!livreur){
        throw new NotFoundException(" Livreur not exsite to update ");
    }else{
        try {
            const updateLiv = await this.livrepo.preload ({
                id , 
                ...updateLivreurDto
            })
            await this.livrepo.save(updateLiv);
            const {password, ...liv}=updateLiv
            return liv ;

        }catch(e){
            throw new Error ( "Un erreur se produit aucour de la modification ");
        }
        
    }

}


async activeLiv(id:number){
    const liv = await this.livrepo.createQueryBuilder("livreur")
    .where("livreur.id = :id " , {id:id})
    .getOne()
    if (!liv){
        throw new NotFoundException(" Livreur not exsite ");
    }else{
        try{
        liv.status=livStatus.Active ;
        await this.livrepo.save(liv);
        return `livreur avec id = ${id} sera active `;
        }catch(e){
        throw new Error(" Un erreur se produit au cour de déactivation de livreur ");
        }
            
        

    }
}

async deactivateLiv(id:number){

    const liv = await this.livrepo.createQueryBuilder("livreur")
    .where("livreur.id = :id " , {id:id})
    .getOne()
    if (!liv){
        throw new NotFoundException(" Livreur not exsite ");
    }else{
        try{
        liv.status=livStatus.Deactive ;
        await this.livrepo.save(liv);
        return `livreur avec id = ${id} sera deactive `;
        }catch(e){
            throw new Error(" Un erreur se produit au cour de déactivation de livreur ");
        }

    } 

}

async isAvailableLiv(id:number){
    const liv = await this.livrepo.createQueryBuilder("livreur")
    .where("livreur.id = :id " , {id:id})
    .getOne()
    if (!liv){
        throw new NotFoundException(" Livreur not exsite ");
    }else{
        try{
        liv.isAvailable = true ;
        await this.livrepo.save(liv);
        return `livreur avec id = ${id} sera disponible `;
        }catch(e){
            throw new Error(" Un erreur se produit ");
        }

    } 
    
}


async isNotAvailableLiv(id:number){
    const liv = await this.livrepo.createQueryBuilder("livreur")
    .where("livreur.id = :id " , {id:id})
    .getOne()
    if (!liv){
        throw new NotFoundException(" Livreur not exsite ");
    }else{
        try{
        liv.isAvailable = false ;
        await this.livrepo.save(liv);
        return `livreur avec id = ${id} sera non disponible `;
        }catch(e){
            throw new Error(" Un erreur se produit ");
        }

    } 
    
}















}