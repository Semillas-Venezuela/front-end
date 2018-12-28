import { GeoInfo } from "./geojson/geoInfo";



export class semillaInfo{
    _id:string;
    imagenUrl?:string;
    audios?:string[];
    textos?:string[];
    desc?:string;
    geoInfo?:GeoInfo;
    
}