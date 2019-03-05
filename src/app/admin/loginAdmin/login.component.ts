import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";


@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginAdminComponent implements OnInit {
    user: {
        email: string;
        password: string;
    }
    constructor(private authService: AuthService,private router: Router) {

    }

    ngOnInit() {

        this.user = {
            email: "",
            password: ""
        }

    }
    loginCorreo() {
        
            this.authService.loginCorreo(this.user.email, this.user.password);
            this.authService.getUser().subscribe(response => {
                if(response!=null){
                this.authService.isAdminVar = (response.uid === 'SobHG3gmLXZs63CDrqCxPZP7eQT2' || response.email === 'semillasvenezuela@gmail.com');
                if (this.authService.isAdmin) {
                    this.router.navigate(["/approval"])
                }
            }
            })
       


    }
}