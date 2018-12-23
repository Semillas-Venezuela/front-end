import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { semillaInfo } from "../models/semillaInfo";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
@Injectable()
export class SemillasService{

    public semillas : AngularFirestoreCollection<semillaInfo>;

    public observableSemillas : Observable<semillaInfo[]>;
    
    constructor(public afs : AngularFirestore){
        //Obtiene la referencia a la coleccion de semillas de FireStorage
        this.semillas=this.afs.collection<semillaInfo>('semillas');

        //Obtiene las semillas respectivas
        this.observableSemillas= this.semillas.snapshotChanges().map(actions=>{
            return actions.map(item=>{
                const data=item.payload.doc.data() as semillaInfo;
                const id =item.payload.doc.id;
            
                //Une al data y al id
                return {...data,id};
            });
        })
    }

    public test(){
        console.log('Semillas service')
        this.observableSemillas.subscribe(
            (semillas)=>{
                console.log("Semillas:");
                console.log(semillas);
            }
        )
        var semilla= new semillaInfo()
        semilla={
            _id:"",
            imagenUrl:`https://picsum.photos/200/300/?random`,
            audios:null,
            textos:null,
            desc:'Loreeeem'
        };
        this.anadirSemilla(semilla);
        this.obtenerSemilla("qwerty").subscribe(
            (semillaEncontrada)=>{
                console.log("Semilla encontrada");
                console.log(semillaEncontrada);
              
            }
        )
    };

    /**
     * Anade una semilla a la base de datos
     * @param semilla semilla a anadir
     */
    public anadirSemilla(semilla : semillaInfo){
        console.log(semilla);
        let idBefore =  this.afs.createId();
        semilla._id = idBefore;
        return this.semillas.doc(idBefore).set(Object.assign({}, semilla)).catch(console.log);
    }

    /**
     * Obtiene una semilla por su id
     * @param _id id de la semilla
     */
    public obtenerSemilla(_id:string) : Observable<semillaInfo>{
        return this.semillas.doc(_id).snapshotChanges().map(item=>{
           const data=item.payload.data() as semillaInfo; 
             return data});
     }

     /**
      * Eliminar semilla
      * @param semilla Semilla a eliminar
      */
     public eliminarSemilla(semilla : semillaInfo) : Promise<void>{
        return this.semillas.doc(semilla._id+'').delete();
    }

    public darFuncionHash(texto:string):string{ 
        var today = new Date();
        var d = today.getDate();
        texto+=today.getHours()+today.getMinutes()+today.getDay()+today.getMilliseconds()+today.getMonth()+today.getFullYear();
        var hash ;
        if (texto.length == 0) {
            return '0';
        }
        for (var i = 0; i < texto.length; i++) {
            var char = texto.charCodeAt(i);
            hash = ((hash<<5)-hash)+char;
            hash = hash & hash; // Convert to 32bit integer
        }
        if(hash<0)
            hash=-hash;
        return hash;
    
    }
}