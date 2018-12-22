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
        semilla={_id:"qwerty",imagenUrl:'',audios:null,textos:null,desc:''};
        this.anadirSemilla(semilla);
        this.obtenerSemilla("qwerty").subscribe(
            (semillaEncontrada)=>{
                console.log("Semilla encontrada");
                console.log(semillaEncontrada);
                this.eliminarSemilla(semillaEncontrada).then(
                    ()=>{console.log("Semilla eliminada")}
                )
            }
        )
    };

    /**
     * Anade una semilla a la base de datos
     * @param semilla semilla a anadir
     */
    public anadirSemilla(semilla : semillaInfo){
        console.log(semilla);
        return this.semillas.doc(semilla._id+'').set(semilla).catch(console.log);
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
}