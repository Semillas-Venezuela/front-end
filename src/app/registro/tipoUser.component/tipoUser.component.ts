import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { SemillasService } from '../../services/semillas.service';

@Component({
    selector: 'app-new-semilla',
    templateUrl: 'tipoUser.component.html',
    styleUrls: ['tipoUser.component.css']
})
export class TipoUser implements OnInit{
    constructor(public router: Router, public semillasService : SemillasService){
        
    }

    ngOnInit(){
        this.semillasService.test();
    }
}