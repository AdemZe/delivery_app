import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userStatus } from './valueobjects/user-Status.enum';

@Injectable()
export class UsersService {
    constructor ( 
    @InjectRepository(UserEntity)
    private readonly  usersRepo :Repository <UserEntity> ,    
    ){}


    async returnUsers():Promise <Partial <UserEntity[]> > {
        return await this.usersRepo.find()  
        
    }   

    async returnUserById(id): Promise < Partial <UserEntity> > { 
        const user = await this.usersRepo.createQueryBuilder("users")
        .where("users.id = :id" , {id})
        .getOne()
 
    // if (!user) {
    //    throw new NotFoundException(` user with id = ${id} not found `)
    // }

     return user

    }

    async creerUtilisateur( createUserDto: CreateUserDto ):Promise < Partial <UserEntity> >{
        
       const  existUser = await this.usersRepo.createQueryBuilder("users")
       .where("users.email = :email" , {email : createUserDto.email})         
       .getOne()

       if( existUser ){
        throw new NotFoundException(` l'utilisateur avec l'email =${createUserDto.email}  est deja existe `)
       }else {

        const User = await this.usersRepo.save({ ...createUserDto });

        const {id,password , ...newuser} = User
        
        return newuser ; 

       }

    } 

    async removeUser(id : any){

        const user=this.returnUserById(id); 
        await this.usersRepo.delete(id);
        return " Suppression avec success ";
    }

    async userUpdate( updateUserDto : UpdateUserDto  ,id : number ){

        const user = this.returnUserById(id); 
        if (user){
            const updateUser = await this.usersRepo.preload({
                id ,
                ...updateUserDto
            })

            await this.usersRepo.save(updateUser)
            const {id:number,password , ...user}= updateUser;

            return user;

        }


    }

    async activateduser (id: number ){
       const  user = await this.returnUserById(id);
       if (!user){
        throw new NotFoundException( `User avec id =${id} est non disponible `);
       }
        user.status = userStatus.Active;
        await this.usersRepo.save(user) ;

        return  ` L'utilisateur avec l'id = ${id} sera active `;

    }


    async deactivateUser( id:number ){
        const user= await this.returnUserById(id);
        if(!user){
            throw new NotFoundException( `User avec id =${id} est non disponible `);
        }
        user.status=userStatus.Deactive;
        await this.usersRepo.save(user) ;

        return  `L'utilisateur avec l'id= ${id} sera deactive `;;

    }






}
