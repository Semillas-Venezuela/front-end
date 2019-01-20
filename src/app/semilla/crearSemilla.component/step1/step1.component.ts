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
    step1(){     
      //Avanza al step2
      this.semilla.step = 2;
      this.semillaChange.emit(this.semilla);
    }
}
