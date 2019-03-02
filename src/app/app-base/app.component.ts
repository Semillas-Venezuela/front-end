import {Component,OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styles: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(){

    }
    ngOnInit(){
      var fixed = document.getElementById('fixed');

        fixed.addEventListener('touchmove', function(e) {

        e.preventDefault();

      }, false);
    }
}
