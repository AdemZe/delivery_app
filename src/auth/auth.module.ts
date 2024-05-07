import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './constantes';
import { UserEntity } from 'src/typeorm/users.entity';

@Module({

  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60000s' },
    }),
    UsersModule,UserEntity
  ],



  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
