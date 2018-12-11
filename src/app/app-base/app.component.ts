import {Component,OnInit} from '@angular/core';
import { oAuth } from '../services/oAuth';
@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styles: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private authService:oAuth){

    }
    ngOnInit(){
      this.authService.setAuthToken();
    }
}
