import { Role } from 'src/autorization/role';
import { userStatus } from '../valueobjects/user-Status.enum';
import { Informations } from 'src/interface/Informations.inetrface';
import { UserEntity } from 'src/typeorm/users.entity';

export class UserDto {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  status: userStatus;
  role: Role;
  informations: Informations[];
  createdAt: Date;

  constructor(user: UserEntity ) {
    this.id = user.id;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.email = user.email;
    this.status = user.status;
    this.role = user.role;
    this.informations = user.informations;
    this.createdAt = user.createdAt;
  

  }
}
