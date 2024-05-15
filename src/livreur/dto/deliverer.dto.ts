import { Informations } from 'src/interface/Informations.inetrface';
import { delivererStatus } from '../valueobjects/delivererStatus.enum';
import { DelivererEntity } from 'src/typeorm/deliverer.entity';

export class DelivererDto {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  status: delivererStatus;
  informations: Informations[];
  isAvailable: boolean;
  nbLivraisonsReussies: number;
  createdAt: Date;

  constructor(deliverer: DelivererEntity) {
    this.id = deliverer.id;
    this.firstname = deliverer.firstname;
    this.email = deliverer.email;
    this.status = deliverer.status;
    this.informations = deliverer.informations;
    this.isAvailable = deliverer.isAvailable;
    this.nbLivraisonsReussies = deliverer.nbLivraisonsReussies;
    this.createdAt = deliverer.createdAt;
  }
}
