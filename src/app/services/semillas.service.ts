import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { semillaInfo } from "../models/semillaInfo";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { AngularFireStorage } from "@angular/fire/storage";
import { Headers, Http, Response } from '@angular/http';


@Injectable()
export class SemillasService {

    public semillas: AngularFirestoreCollection<semillaInfo>;
    public mensajes: AngularFirestoreCollection<any>;

    public observableSemillas: Observable<semillaInfo[]>;
    public observableMensajes:Observable<any[]>;

    constructor(public afs: AngularFirestore, private storage: AngularFireStorage,private http: Http) {
        //Obtiene la referencia a la coleccion de semillas de FireStorage
        this.semillas = this.afs.collection<semillaInfo>('semillas');
        this.mensajes = this.afs.collection<any>('mensajes');

        //Obtiene las semillas respectivas
        this.observableSemillas = this.semillas.snapshotChanges().map(actions => {
            return actions.map(item => {
                const data = item.payload.doc.data() as semillaInfo;
                const id = item.payload.doc.id;

                //Une al data y al id
                return { ...data, id };
            });
        })
        this.observableMensajes = this.mensajes.snapshotChanges().map(actions => {
            return actions.map(item => {
                const data = item.payload.doc.data();
                const id = item.payload.doc.id;

                //Une al data y al id
                return { ...data, id };
            });
        })
    }


    public generateSemillaID():string{
        let idBefore = this.afs.createId();
        return idBefore;
    }

    /**
     * Anade un mensaje a la base de datos
     * @param mensaje mensaje a anadir
     */
    public anadirMensaje(mensaje) {

        return this.mensajes.doc(Date.now()+'').set(Object.assign({}, mensaje)).catch(console.log);
    }
    
    /**
     * Anade una semilla a la base de datos
     * @param semilla semilla a anadir
     */
    public anadirSemilla(semilla: semillaInfo) {

        return this.semillas.doc(semilla._id).set(Object.assign({}, semilla)).catch(console.log);
    }

    /**
     * Obtiene una semilla por su id
     * @param _id id de la semilla
     */
    public obtenerSemilla(_id: string): Observable<semillaInfo> {
        return this.semillas.doc(_id).snapshotChanges().map(item => {
            const data = item.payload.data() as semillaInfo;
            return data
        });
    }
    public actualizarSemilla(semilla:semillaInfo){
        return this.semillas.doc(semilla._id+ "").update(semilla);
    }
    /**
     * Eliminar semilla
     * @param semilla Semilla a eliminar
     */
    public eliminarSemilla(semilla: semillaInfo): Promise<void> {
        return this.semillas.doc(semilla._id + '').delete();
    }
    public eliminarContenidosSemilla(id:string){
        this.storage.ref(id).delete()
    }
    
    uploadFile(path, file){
        let a=this.storage.ref(path)
        a.put(file);
        const customMetadata = { app: 'VinylApp' };
        let task= this.storage.upload(path,file, {customMetadata})
        return task
    }

    arrayToGeopoints(arreglo): Object[] {
        let arregloPuntos = new Array();
        arreglo.forEach(punto => {
            let geoPunto= {latitude:punto[0], longitude:punto[1]}
            arregloPuntos.push(geoPunto);
        });
        return arregloPuntos;
    }
    geoPointsToArray(geopoints): Array<Number> {
        let arregloArreglos = new Array();
        geopoints.forEach((geoPunto) => {
            let arreglo = [geoPunto.latitude, geoPunto.longitude]
            arregloArreglos.push(arreglo);
        })
        return arregloArreglos;
    }

}