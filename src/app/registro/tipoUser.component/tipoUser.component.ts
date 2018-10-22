import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-new-semilla',
    templateUrl: 'tipoUser.component.html',
    styleUrls: ['tipoUser.component.css']
})
export class TipoUser implements OnInit{
    constructor(public router: Router){
        
    }

    ngOnInit(){

    }
}