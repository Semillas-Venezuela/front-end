import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { semillaInfo } from '../models/semillaInfo';
import { HttpClient } from '@angular/common/http';
import { ResponseSemillas } from '../models/response';

@Injectable({
  providedIn: 'root'
})
export class MapService{

  constructor(private http: HttpClient) { }


  getSemilla(id:String){
    let semilla;
    this.http.get("../../assets/json-prueba/semillas.json").subscribe( (x:semillaInfo[])=>{
      x.filter(y=>{
        y._id == id;
        semilla = y
      })
      
      alert(JSON.stringify(semilla))
      
    })
    return semilla;
  }

}