import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public message: string;
  public numeros: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];



  public lottieConfig: Object;
  private anim: any;
  private animationSpeed: number = 1;
  constructor(public router: Router) {
 
    this.lottieConfig = {
      path: 'assets/dataAnim.json',
      renderer: 'svg',
      autoplay: false,
      loop: true
    };
  }

  ngOnInit() {
    
    
    
  }

  

  ngAfterViewInit() {

   
    
  }
  redirectMap() {

    this.router.navigate(['/map']);
  }



  handleAnimation(anim: any) {
    this.anim = anim;
    setTimeout(()=>{
      this.anim.play()

    },900)
    
  }

  stop() {
    this.anim.stop();
  }

  play() {
    this.anim.play();
  }

  pause() {
    this.anim.pause();
  }

  setSpeed(speed: number) {
    this.animationSpeed = speed;
    this.anim.setSpeed(speed);
  }
}
