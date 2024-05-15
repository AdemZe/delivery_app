import { Module } from '@nestjs/common';
import { AuthServiceUser } from './users/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './constantes';
import { UserEntity } from 'src/typeorm/users.entity';
import { AuthControllerUser } from './users/auth.controller';
import { AuthControllerDeliverer } from './deliverer/auth.controller';
import { AuthServiceDeliverer } from './deliverer/auth.service';
import { DelivererModule } from 'src/livreur/deliverer.module';
import { DelivererEntity } from 'src/typeorm/deliverer.entity';
import { DelivererService } from 'src/livreur/deliverer.service';

@Module({

  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60000s' },
    }),
    UsersModule,
    DelivererModule, 
    UserEntity , 
    DelivererEntity
  ],

  

  controllers: [AuthControllerUser,AuthControllerDeliverer],
  providers: [AuthServiceUser,AuthServiceDeliverer],
})
export class AuthModule {}

