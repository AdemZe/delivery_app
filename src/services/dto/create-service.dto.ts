import { IsNotEmpty, IsString } from "class-validator";
import { Point } from "geojson";


export class CreateServiceDto{


@IsNotEmpty()
@IsString()   
objetLivré:string ;

@IsNotEmpty()
prix:number;


@IsNotEmpty()
depart: Point ;


@IsNotEmpty()
arrivee: Point ; 




    
}