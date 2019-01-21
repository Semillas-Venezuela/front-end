import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SemillasService } from '../../services/semillas.service';
import { semillaInfo } from '../../models/semillaInfo';
import { AuthService } from '../../services/auth.service';
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
    selector: 'app-crear-semilla',
    templateUrl: 'crearSemilla.component.html',
    styleUrls: ['crearSemilla.component.css']
})
export class CrearSemillaComponent implements OnInit {

    public semilla: semillaInfo = new semillaInfo();
    idUsuario:any;

   
    constructor(
        public router: Router,
        public semillasService: SemillasService,
        public authService : AuthService,
        private deviceService:DeviceDetectorService
        ) {

    }

    ngOnInit() {
        JSON.stringify(this.semilla)
       setInterval(x=>console.log(JSON.stringify(this.semilla)),20000)
        
        
    }

    crearSemilla() {
        console.log(1)

        this.semillasService.anadirSemilla(this.semilla).then(
            () => {
                console.log("Semilla creada");
            }
        )
    }

    step(valor){
        let boilerplate={
            timesShared:0,
            CurrentOcupation:"",
            VenezuelaOcupation:"",
            dateCreated:new Date(),
            age:"",
            device:`${this.deviceService.os} ${this.deviceService.device} ${this.deviceService.browser} `
          }
        if(!localStorage.getItem("idUser")){
            this.authService.loginAnonimo();
            this.authService.getUser().subscribe(
                (user)=>{
                    if(user!=null){
                        this.idUsuario=user.uid;
                        localStorage.setItem("idUser", JSON.stringify(this.idUsuario));
                        this.semilla.userId=this.idUsuario;
                        this.semilla = {...this.semilla,...boilerplate}
                        this.semilla.step=valor;

                    }
                    
                }
            );
        }else{
            this.idUsuario= localStorage.getItem("idUser")
            this.semilla = {...this.semilla,...boilerplate}
            this.semilla.step=valor;
        }
        
        
    }
}