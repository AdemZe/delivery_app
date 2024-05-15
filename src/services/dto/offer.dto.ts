import { OfferEntity } from "src/typeorm/offers.entity";


export class OfferDto{

    id: number;

    locationCoordination :{
        latitude:number ; 
        longitude:number;
    }


    itemDelivered : string;
    deliveryPrice: number ; 


    constructor(offer : OfferEntity){
        this.id= offer.id ;
        this.locationCoordination= offer.locationCoordination
        this.itemDelivered= offer.itemDelivered;
        this.deliveryPrice= offer.deliveryPrice;
        
    }










    
}