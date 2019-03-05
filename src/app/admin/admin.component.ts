import { Component,OnInit } from "@angular/core";
import { SemillasService } from "../services/semillas.service";
import { semillaInfo } from "../models/semillaInfo";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";


@Component({
    selector:"app-admin",
    templateUrl:"./admin.component.html",
    styleUrls:["./admin.component.css"]
})
export class AdminComponent implements OnInit{
    semillasSinAprobar:semillaInfo[] = new Array();
    semillaActual:semillaInfo;
    constructor( private serviceSemillas: SemillasService, private authService:AuthService, private router:Router){

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
    logout(){
        this.router.navigate(["/adminLogin"])
        console.log("cerrando sesión")
        this.authService.logout();
        this.authService.isAdminVar = false;
    }
    toggleSidebar(){
        document.getElementById("sidebar").classList.toggle("active")
    }
    aprobar(){

    }
    rechazar()
{

}
}