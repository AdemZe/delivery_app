import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Role } from 'src/autorization/role';
import { Roles } from 'src/autorization/roles.decorator';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

    
    @Get()
    @Roles(Role.Admin)
    getAllUsers(){
      return this.usersService.getAllUsers()

    }


    @Post()
    async createUser(  @Body() createUserDto  : CreateUserDto   ){
      return await this.usersService.createUser(createUserDto)

    }

    @Get(":id")
    async getUserById(  @Param("id" , ParseIntPipe)  id: number   ){
      return await this.usersService.getUserById(id)

    }




    @Delete(":id")
    async deleteUser( @Param("id" ,ParseIntPipe ) id : number ){

      return await this.usersService.removeUser(id);

    }


    @Patch(":id")
    async UpdateUser( @Body() updateUserDto  :UpdateUserDto , @Param("id" , ParseIntPipe) id : number ){

      return await this.usersService.userUpdate( updateUserDto,id )


    }


    @Patch("/activate/:id")
    async activateUser(  @Param("id"  , ParseIntPipe  ) id:number ){
      return await this.usersService.activateduser(id)
    }


    @Patch("/deactivate/:id")
    async deactivateUser(  @Param("id" , ParseIntPipe ) id: number){
      return await this.usersService.deactivateUser(id);
    }

  
}
