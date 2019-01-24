import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';


@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html',
    styleUrls: ['menu.component.css']
})
export class MenuComponent implements OnInit {
    constructor(public router: Router, private deviceDetector: DeviceDetectorService) {

    }

    ngOnInit() {

    }
    llamado() {
        
        // if (this.deviceDetector.device == "Android" || this.deviceDetector.device == "iPhone" || this.deviceDetector.device == "iPod" || this.deviceDetector.device == "iPad"|| this.deviceDetector.device == "Windows-Phone") {
        //     var elem: any = document.documentElement;
        //     if (elem.requestFullscreen) {
        //         elem.requestFullscreen();
        //     } else if (elem.mozRequestFullScreen) { /* Firefox */
        //         elem.mozRequestFullScreen();
        //     } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
        //         elem.webkitRequestFullscreen();
        //     } else if (elem.msRequestFullscreen) { /* IE/Edge */
        //         elem.msRequestFullscreen();
        //     }

        // }
        this.router.navigate(["/new"]);
    }
}