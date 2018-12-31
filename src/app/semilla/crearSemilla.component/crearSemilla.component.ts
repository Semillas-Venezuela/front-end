import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { SemillasService } from '../../services/semillas.service';
import { semillaInfo } from '../../models/semillaInfo';


@Component({
    selector: 'app-crear-semilla',
    templateUrl: 'crearSemilla.component.html',
    styleUrls: ['crearSemilla.component.css']
})
export class CrearSemillaComponent implements OnInit{
    
    public semilla : semillaInfo;
   

    constructor(public router: Router, public semillasService : SemillasService){
        
    }

    ngOnInit(){
        this.semilla=new semillaInfo();
    }

    crearSemilla(){
        console.log(1)
        this.semilla._id=this.semillasService.darFuncionHash(this.semilla.desc+'');
        this.semillasService.anadirSemilla(this.semilla).then(
            ()=>{
                console.log("Semilla creada");
            }
        )
    }
}