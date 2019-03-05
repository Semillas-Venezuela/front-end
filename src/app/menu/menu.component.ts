import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SemillasService } from '../services/semillas.service';

import { observable } from 'rxjs';


@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.css']
})
export class MenuComponent implements OnInit {
    abierto: boolean = false;

    constructor(public router: Router, private deviceDetector: DeviceDetectorService, private serviceSemillas: SemillasService) {

    }

    ngOnInit() {
        var fixed = document.getElementById('touch-bar');

        fixed.addEventListener('touchmove', function(e) {

                    e.preventDefault();

        }, false);
    }
 
    toggleMenu() {
        let menuBars = document.getElementById("menu-bars");
        if(this.abierto){
            menuBars.classList.remove("fa-times");
            menuBars.classList.add("fa-bars");
            this.abierto= false;
        }else{
            menuBars.classList.remove("fa-bars");
            menuBars.classList.add("fa-times");
            this.abierto = true;
        }
        document.querySelector(".responsive-navbar").classList.toggle("active")
    }
}