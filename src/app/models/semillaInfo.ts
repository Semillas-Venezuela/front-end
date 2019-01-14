import { GeoInfo } from "./geojson/geoInfo";



export class semillaInfo{
    _id:string;
    imagenUrl?:string;
    audios?:string[];
    textos?:string[];
    desc?:string;
    geoInfo?:GeoInfo;
    published?:boolean;
    name?:string;
    gender?:string;
    age?:string;
    martialStatus?:string;
    educativeLevel?:string;
    VenezuelaOcupation?:string;
    CurrentOcupation?:string;
    device?:string;
    dateCreated?:Date;
    place?:string;
    timesShared?:number;
    step1?:boolean;
    step2?:boolean;
    step3?:boolean;
}