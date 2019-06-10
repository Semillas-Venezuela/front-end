import {Component,OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
declare var ga: Function;
@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styles: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(public router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }
    ngOnInit(){
      var fixed = document.getElementById('fixed');

        fixed.addEventListener('touchmove', function(e) {

        e.preventDefault();

      }, false);
    }
}
