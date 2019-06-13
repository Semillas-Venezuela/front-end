import {Component,OnInit} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
declare var ga;
@Component({
  selector: 'app-root',
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cookie:boolean;
  constructor(public router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });

    if(!localStorage.getItem('cookie')){
      console.log("no hay cookie");
      
      this.cookie= false;
    }else{
      console.log("hay cookie");
      this.cookie = true;
    }
  }
    ngOnInit(){
      var fixed = document.getElementById('fixed');

        fixed.addEventListener('touchmove', function(e) {

        e.preventDefault();

      }, false);
    }

    cookieAproval(){
        localStorage.setItem("cookie", "true");
        this.cookie= true;
    }
}
