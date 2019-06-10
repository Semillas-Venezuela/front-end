import {Component,OnInit, Input, Output, EventEmitter} from '@angular/core';
import { semillaInfo } from '../../../models/semillaInfo';



@Component({
  selector: 'step1',
  templateUrl:'./step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1 implements OnInit {


    day;
    month;
    year;
    maxYear
    @Input() semilla:semillaInfo;
    @Output() semillaChange= new EventEmitter<semillaInfo>();
   
    
    constructor(){
      this.maxYear = new Date().getFullYear();
    }
    ngOnInit(){
     
    }
    step(value){     
      //Avanza al step2
      let date 
      if(this.month >=10){
         date = new Date(`${this.day}/${this.month}/${this.year}`).toString()
      }
      else{
        date = new Date(`${this.day}/0${this.month}/${this.year}`).toString()
      }
      
      console.log(date);
      this.semilla.birthDate = date;
      console.log(this.semilla);
      
      this.semilla.step = value;
      this.semillaChange.emit(this.semilla);
    }
 
}
