import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { SemillasService } from '../../services/semillas.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-new-semilla',
    templateUrl: 'tipoUser.component.html',
    styleUrls: ['tipoUser.component.css']
})
export class TipoUser implements OnInit{
    idUsuario:any;
    constructor(public router: Router, 
        public semillasService : SemillasService,
        public authService : AuthService){
        
    }

    ngOnInit(){
        //this.semillasService.test();
        this.idUsuario=null;
        this.authService.getUser().subscribe(
            (user)=>{
                if(user!=null)
                this.idUsuario=user.uid;
            }
        );
    }
    loginAnonimo(){
        this.authService.loginAnonimo();
    }
    logout(){
        this.authService.logout().then(
           ()=> {this.idUsuario=null;}
        );
    }
}