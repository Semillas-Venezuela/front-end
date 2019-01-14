import {Component,OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'step1',
  templateUrl:'./step1.component.html',
  styles: ['./step1.component.html']
})
export class Step1 implements OnInit {


    @Input() status: boolean;
    @Output() statusChange= new EventEmitter<boolean>();
    
    constructor(){

    }
    ngOnInit(){
      
    }
    setStatus(status:boolean){
      console.log(status);
      this.status=status;
      this.statusChange.emit(status);
    }
}
