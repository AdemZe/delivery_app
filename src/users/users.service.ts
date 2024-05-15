import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/typeorm/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { userStatus } from './valueobjects/user-Status.enum';
import { UserDto } from './dto/user.dto';
import { error } from 'console';

@Injectable()
export class UsersService {
    constructor ( 
    @InjectRepository(UserEntity)
    private readonly  usersRepo :Repository <UserEntity> ,    
    ){}


    async getAllUsers():Promise <UserDto[]> {
        return await this.usersRepo.find()  
        
    }   

    async getUserById(id): Promise <UserDto>  { 
        const user = await this.usersRepo.createQueryBuilder("users")
        .where( "users.id = :id" , {id} )
        .getOne()
 
    // if (!user) {
    //    throw new NotFoundException(` user with id = ${id} not found `)
    // }

     return user.toUserDto()

    }

    async createUser( createUserDto: CreateUserDto ):Promise <UserDto> {
        
       const  existUser = await this.usersRepo.createQueryBuilder("users")
       .where("users.email = :email" , {email : createUserDto.email})         
       .getOne()

       if( existUser ){
        throw new error (` l'utilisateur avec l'email =${createUserDto.email}  est deja existe `)
       }else {

        const User = await this.usersRepo.save({ ...createUserDto });

        //const {id,password , ...newuser} = User
        
        //return newuser ; 
        return User.toUserDto();
       }

    } 

    async removeUser(id : any){

        const user=this.getUserById(id); 
        if (! user){        
        throw new error(" user not existe ")    
        }else{
            try{
            await this.usersRepo.delete(id);
            return " Suppression avec success ";
            }catch(e){
            throw new InternalServerErrorException(" Un erreur se produit au cour de la suppression ")    
            }
        }

    }

    async userUpdate( updateUserDto : UpdateUserDto  ,id : number ):Promise<UserDto>{

        const user = this.getUserById(id); 
        if (user){
            const updateUser = await this.usersRepo.preload({
                id ,
                ...updateUserDto
            })

            await this.usersRepo.save(updateUser)
           // const {id:number,password , ...user}= updateUser;

            //return user;
            return updateUser.toUserDto()

        }


    }

    async activateduser (id: number ){
       const  user = await this.getUserById(id);
       if (!user){
        throw new NotFoundException( `User avec id =${id} est non disponible `);
       }
        user.status = userStatus.Active;
        await this.usersRepo.save(user) ;

        return  ` L'utilisateur avec l'id = ${id} sera active `;

    }


    async deactivateUser( id:number ){
        const user= await this.getUserById(id);
        if(!user){
            throw new NotFoundException( `User avec id =${id} est non disponible `);
        }
        user.status=userStatus.Deactive;
        await this.usersRepo.save(user) ;

        return  `L'utilisateur avec l'id= ${id} sera deactive `;;

    }






}
