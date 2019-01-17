import {Component,OnInit, Input, Output, EventEmitter} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { semillaInfo } from '../../../models/semillaInfo';

@Component({
  selector: 'step2',
  templateUrl:'./step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2 implements OnInit {
    @Input() semilla:semillaInfo;
    @Output() semillaChange= new EventEmitter<semillaInfo>();
    Map:mapboxgl.Map
    constructor(){

    }
    ngOnInit(){
      
    }
    search(){
      document.querySelector(".search-bar").classList.toggle("active")
    }
    setStatus(valor){
      console.log("cambió");
      this.semilla.step2=true;
    }
}