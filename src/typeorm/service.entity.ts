import { Column, Entity,  PrimaryGeneratedColumn } from "typeorm";
import { Point } from 'geojson';

@Entity()
export class ServiceEntity{



    @PrimaryGeneratedColumn()
    id : number ;



    
    @Column({
        type: 'geometry',
        spatialFeatureType: 'Point',
        srid: 4326, // SRID pour WGS 84
        nullable: true
    })
    depart: Point;

    @Column({
        type: 'geometry',
        spatialFeatureType: 'Point',
        srid: 4326, // SRID pour WGS 84
        nullable: true
    })
    arrivee: Point;



}