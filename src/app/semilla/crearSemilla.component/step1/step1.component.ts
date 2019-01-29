import {Component,OnInit, Input, Output, EventEmitter} from '@angular/core';
import { semillaInfo } from '../../../models/semillaInfo';



@Component({
  selector: 'step1',
  templateUrl:'./step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1 implements OnInit {


    
    @Input() semilla:semillaInfo;
    @Output() semillaChange= new EventEmitter<semillaInfo>();
   
    
    constructor(){

    }
    ngOnInit(){
     
    }
    step(value){     
      //Avanza al step2
      this.semilla.step = value;
      this.semillaChange.emit(this.semilla);
    }
 
}
