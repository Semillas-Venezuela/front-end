import { Component,OnInit } from "@angular/core";
import { SemillasService } from "../services/semillas.service";
import { semillaInfo } from "../models/semillaInfo";


@Component({
    selector:"app-admin",
    templateUrl:"./admin.component.html",
    styleUrls:["./admin.component.css"]
})
export class AdminComponent implements OnInit{
    semillasSinAprobar:semillaInfo[] = new Array();
    semillaActual:semillaInfo;
    constructor( private serviceSemillas: SemillasService){

    }

    ngOnInit(){
        this.serviceSemillas.observableSemillas.subscribe(semillas=>{
            semillas.forEach(semillaIndividual=>{
                if(!semillaIndividual.published)
                    this.semillasSinAprobar.push(semillaIndividual);
            })
        })
        
    }

    selectSemilla(semilla){
        this.semillaActual = semilla;
        
    }

}