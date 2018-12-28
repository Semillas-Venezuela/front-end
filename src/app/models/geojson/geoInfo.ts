
export class GeoInfo{
    id?:string;
    type?:string;
    source?:{
        type?:string;
        data?:{
            type?:string;
            properties?:{};
            geometry?:{
                type?:string;
                coordinates?: Object[];
            }
        }
    };
    layout?:any;
    paint?:any;
    
   
}