import { Module } from '@nestjs/common';
import { AuthServiceUser } from './users/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './constantes';
import { UserEntity } from 'src/typeorm/users.entity';
import { AuthControllerUser } from './users/auth.controller';
import { AuthControllerLivreur } from './livreur/auth.controller';
import { AuthServiceLivreur } from './livreur/auth.service';
import { LivreurModule } from 'src/livreur/livreur.module';
import { LivreurEntity } from 'src/typeorm/livreur.entity';
import { LivreurService } from 'src/livreur/livreur.service';

@Module({

  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60000s' },
    }),
    UsersModule,
    LivreurModule, 
    UserEntity , 
    LivreurEntity
  ],

  

  controllers: [AuthControllerUser,AuthControllerLivreur],
  providers: [AuthServiceUser,AuthServiceLivreur],
})
export class AuthModule {}

