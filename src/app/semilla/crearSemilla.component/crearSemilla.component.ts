import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SemillasService } from '../../services/semillas.service';
import { semillaInfo } from '../../models/semillaInfo';



@Component({
    selector: 'app-crear-semilla',
    templateUrl: 'crearSemilla.component.html',
    styleUrls: ['crearSemilla.component.css']
})
export class CrearSemillaComponent implements OnInit {

    public semilla: semillaInfo = new semillaInfo();
    
   
    constructor(public router: Router, public semillasService: SemillasService) {

    }

    ngOnInit() {
     
            
        
    }

    crearSemilla() {
        console.log(1)

        this.semillasService.anadirSemilla(this.semilla).then(
            () => {
                console.log("Semilla creada");
            }
        )
    }

    
}