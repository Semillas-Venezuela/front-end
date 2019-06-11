import { Component, OnInit } from "@angular/core";
import { SemillasService } from "../services/semillas.service";

@Component({
    selector:'contacto',
    templateUrl:'contacto.component.html',
    styleUrls:['contacto.component.css']
})
export class ContactoComponent implements OnInit{
    formInfo:any= {};
    constructor(private semillaService: SemillasService){

    }
    ngOnInit(){
        this.formInfo= {};
    }
    send(){
        this.semillaService.anadirMensaje(this.formInfo).then(x=>{})
    }

}