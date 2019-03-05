import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) { }


    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (this.auth.isAdmin()) { console.log("Eres Admin"); return true; }
        else if (!this.auth.isAdmin() && this.auth.llamadoDesdeStep) {
            this.auth.llamadoDesdeStep = false;
            return false
        } else {
            console.log('access denied!')
            this.router.navigate(['/adminLogin']);
            return false;
        }




    }
}