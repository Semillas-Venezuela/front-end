import {Component, OnInit, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html',
  styleUrls:['./home.component.css']
})
export class HomeComponent implements OnInit,AfterViewInit {
  public message: string;
  public numeros: number[] = [1,2,3,4,5,6,7,8,9,10];
  constructor(public router : Router) {}

  ngOnInit() {
    
    
  }
  ngAfterViewInit(){
 
  }
  redirectMap(){
    
    this.router.navigate(['/map']);
  }
}
