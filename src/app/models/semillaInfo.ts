import { GeoInfo } from "./geojson/geoInfo";



export class semillaInfo{
    _id:string;
    imagenUrl?:string;
    testimonialType?:string;
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
    venezuelaOcupation?:string;
    currentOcupation?:string;
    device?:string;
    dateCreated?:string;
    place?:string;
    timesShared?:number;
    step?:number;
    userId?:number;
    leaveDate?:string;
    
}