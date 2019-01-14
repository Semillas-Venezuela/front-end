import {Component,OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'step1',
  templateUrl:'./step1.component.html',
  styles: ['./step1.component.html']
})
export class Step1 implements OnInit {


    @Input() boton1: boolean;
    @Output() boton1Change= new EventEmitter<boolean>();
    
    constructor(){

    }
    ngOnInit(){
      
    }
    setStatus(status:boolean){
      console.log(status);
      this.boton1=status;
      console.log(this.boton1)
      this.boton1Change.emit(status);
    }
}
