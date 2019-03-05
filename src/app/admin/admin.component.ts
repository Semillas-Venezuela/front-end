import { Component, OnInit } from "@angular/core";
import { SemillasService } from "../services/semillas.service";
import { semillaInfo } from "../models/semillaInfo";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import {saveAs as importedSaveAs} from "file-saver";

@Component({
    selector: "app-admin",
    templateUrl: "./admin.component.html",
    styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
    semillasSinAprobar: semillaInfo[] = new Array();
    semillaActual: semillaInfo;
    todasSemillas: semillaInfo[];
    constructor(private serviceSemillas: SemillasService, private authService: AuthService, private router: Router) {

    }

    ngOnInit() {

        this.serviceSemillas.observableSemillas.subscribe(semillas => {
            this.todasSemillas = semillas;
            semillas.forEach(semillaIndividual => {
                if (!semillaIndividual.published)
                    this.semillasSinAprobar.push(semillaIndividual);
            })
        })

    }

    selectSemilla(semilla) {
        this.semillaActual = semilla;

    }
    logout() {
        this.router.navigate(["/adminLogin"])
        console.log("cerrando sesión")
        this.authService.logout();
        this.authService.isAdminVar = false;
    }
    toggleSidebar() {
        document.getElementById("sidebar").classList.toggle("active")
    }


    descargarCSV() {
        
       let data = this.todasSemillas.map(x=>{
            {  
                if(x.testimonialType == 'audio'){
                    return {
                        _id:x._id,
                        testimonialType: x.testimonialType,
                        audio1:x.audios[0],
                        audio2:x.audios[1],
                        audio3:x.audios[2],
                        audio4:x.audios[3],
                        texto1:"VACIO",
                        texto2:"VACIO",
                        texto3:"VACIO",
                        texto4:"VACIO",
                        published:x.published,
                        name:x.name,
                        gender: x.gender,
                        age:x.age,
                        martialStatus:x.martialStatus,
                        educativeLevel:x.educativeLevel,
                        venezuelaOcupation:x.venezuelaOcupation,
                        currentOcupation:x.currentOcupation,
                        device:x.device,
                        dateCreated:x.dateCreated,
                        timesShared:x.timesShared
                    }
                    
                }else{
                    return {
                        _id:x._id,
                        testimonialType: x.testimonialType,
                        texto1:x.textos[0],
                        texto2:x.textos[1],
                        texto3:x.textos[2],
                        texto4:x.textos[3],
                        audio1:"VACIO",
                        audio2:"VACIO",
                        audio3:"VACIO",
                        audio4:"VACIO",
                        published:x.published,
                        name:x.name,
                        gender: x.gender,
                        age:x.age,
                        martialStatus:x.martialStatus,
                        educativeLevel:x.educativeLevel,
                        venezuelaOcupation:x.venezuelaOcupation,
                        currentOcupation:x.currentOcupation,
                        device:x.device,
                        dateCreated:x.dateCreated,
                        timesShared:x.timesShared
                    }
                }
                
            }

        });
        
        
        const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
        const header = Object.keys(data[0]);
        let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
        csv.unshift(header.join(','));
        let csvArray = csv.join('\r\n');
    
        var blob = new Blob([csvArray], {type: 'text/csv' })
        importedSaveAs(blob, "ReportSemillas");
  
        

    }
    aprobar() {

    }
    rechazar() {

    }
}