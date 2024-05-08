import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LivreurService } from 'src/livreur/livreur.service';
import { LivreurEntity } from 'src/typeorm/livreur.entity';
import { ServiceEntity } from 'src/typeorm/service.entity';
import { UserEntity } from 'src/typeorm/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {

    constructor(       
    @InjectRepository(ServiceEntity)
    private readonly serviceRepo : Repository<ServiceEntity>,

    @InjectRepository(UserEntity)
    private readonly usersRepo : Repository<UserEntity>,

    @InjectRepository(LivreurEntity)
    private readonly livRepo : Repository<LivreurEntity>,

    private userService : UsersService , 
    private livreurService : LivreurService ,   
    ){}




async returnAllServices(){
    return await this.serviceRepo.find()
}



async creerUnService( createServiceDto: CreateServiceDto,
    req: Request , 

    ){
    const service = this.serviceRepo.create({
        ...createServiceDto,

    });
    await this.serviceRepo.save(service);
    return service;
}






}
