import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
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
export class CrearSemillaComponent implements OnInit, OnDestroy {

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
        
        if(localStorage.getItem("semilla")){
            //Ejecutar alerta infromando que se ha recuperado la sesión
            // y ofrecer la posibilidad de eliminar el intento hecho
            let semillatmp= JSON.parse(localStorage.getItem("semilla"));
            this.semilla = semillatmp;     
        }
        
    }
    ngOnDestroy(){
        localStorage.setItem("semilla", JSON.stringify(this.semilla))
    }



    step(valor){

        let boilerplate={
            timesShared:0,
            CurrentOcupation:"",
            VenezuelaOcupation:"",
            dateCreated:new Date(),
            age:"",
            device:`${this.deviceService.os} ${this.deviceService.device} ${this.deviceService.browser} `,
            _id:this.semillasService.generateSemillaID()
          }

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
        /* if(!localStorage.getItem("idUser")){
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
         */
        
    }
}