import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { semillaInfo } from "../models/semillaInfo";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import { AngularFireStorage } from "@angular/fire/storage";


@Injectable()
export class SemillasService {

    public semillas: AngularFirestoreCollection<semillaInfo>;

    public observableSemillas: Observable<semillaInfo[]>;

    constructor(public afs: AngularFirestore, private storage: AngularFireStorage) {
        //Obtiene la referencia a la coleccion de semillas de FireStorage
        this.semillas = this.afs.collection<semillaInfo>('semillas');

        //Obtiene las semillas respectivas
        this.observableSemillas = this.semillas.snapshotChanges().map(actions => {
            return actions.map(item => {
                const data = item.payload.doc.data() as semillaInfo;
                const id = item.payload.doc.id;

                //Une al data y al id
                return { ...data, id };
            });
        })
    }

    public test() {
        var semilla = new semillaInfo()
        let geoInfo = [
            [-122.48369693756104, 37.83381888486939],
            [-122.48348236083984, 37.83317489144141],
            [-122.48339653015138, 37.83270036637107],
            [-122.48356819152832, 37.832056363179625],
            [-122.48404026031496, 37.83114119107971],
            [-122.48404026031496, 37.83049717427869],
            [-122.48348236083984, 37.829920943955045],
            [-122.48356819152832, 37.82954808664175],
            [-122.48507022857666, 37.82944639795659],
            [-122.48610019683838, 37.82880236636284],
            [-122.48695850372314, 37.82931081282506],
            [-122.48700141906738, 37.83080223556934],
            [-122.48751640319824, 37.83168351665737],
            [-122.48803138732912, 37.832158048267786],
            [-122.48888969421387, 37.83297152392784],
            [-122.48987674713133, 37.83263257682617],
            [-122.49043464660643, 37.832937629287755],
            [-122.49125003814696, 37.832429207817725],
            [-122.49163627624512, 37.832564787218985],
            [-122.49223709106445, 37.83337825839438],
            [-122.49378204345702, 37.83368330777276],
            [
                -63.29223632812499,
                -18.28151823530889
            ]
        ]
        let geoInfo2 = this.arrayToGeopoints(geoInfo);
        semilla = {
            _id: "",
            imagenUrl: `https://picsum.photos/200/300/?random`,
            audios: null,
            textos: null,
            desc: 'Loreeeem',
            geoInfo: {
                "id": "Asdakdakdkadada",
                "type": "line",
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "type": "LineString",
                            "coordinates": geoInfo2,
                        }
                    }
                },
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
                "paint": {
                    "line-color": "red",
                    "line-width": 3
                }
            }
        };
        this.anadirSemilla(semilla);
    };

    /**
     * Anade una semilla a la base de datos
     * @param semilla semilla a anadir
     */
    public anadirSemilla(semilla: semillaInfo) {
        console.log(semilla);
        let idBefore = this.afs.createId();
        semilla._id = idBefore;
        return this.semillas.doc(idBefore).set(Object.assign({}, semilla)).catch(console.log);
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

    /**
     * Eliminar semilla
     * @param semilla Semilla a eliminar
     */
    public eliminarSemilla(semilla: semillaInfo): Promise<void> {
        return this.semillas.doc(semilla._id + '').delete();
    }

    
    uploadFile(file,path){
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