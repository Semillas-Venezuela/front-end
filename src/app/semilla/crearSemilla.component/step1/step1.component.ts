import {Component,OnInit, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import { semillaInfo } from '../../../models/semillaInfo';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'step1',
  templateUrl:'./step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1 implements OnInit {
    year;
    maxYear;
    @Input() semilla:semillaInfo;
    @Output() semillaChange= new EventEmitter<semillaInfo>();
    @ViewChild("semillasForm") public userFrm: NgForm;
    
    constructor(){
      this.maxYear = new Date().getFullYear();
    }
    ngOnInit(){
     
    }
    step(value){     
      //Avanza al step2
      if(this.userFrm.valid){
        if(this.semilla.leaveDate){
          this.semilla.leaveDate = "Nació en el extranjero."
        }else{
          this.semilla.leaveDate = this.year;
        }
  
        
        this.semilla.step = value;
        this.semillaChange.emit(this.semilla);
      }
    }
    validForm(){
      console.log(this.userFrm.valid);
      
      this.userFrm.valid ? console.log("valid"): alert("Llena los espacios obligatorios");
      
    }
}
