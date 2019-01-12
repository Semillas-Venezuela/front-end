import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { semillaInfo } from "../models/semillaInfo";
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import { AngularFireStorage } from "@angular/fire/storage";

@Injectable()
export class MapService{
  public semillas: AngularFirestoreCollection<semillaInfo>;

    public observableSemillas: Observable<semillaInfo[]>;

    constructor(public afs: AngularFirestore, private storage: AngularFireStorage) {
     }


 

}