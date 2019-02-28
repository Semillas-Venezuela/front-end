import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";

@Injectable()
export class AuthService{
   
    constructor(
        private afAuth:AngularFireAuth
    ){
    }

    /**
     * Inicia sesion anonimamente
     */
    loginAnonimo():Promise<any>{
        return this.afAuth.auth.signInAnonymously();
    }
    
    /**
     * Cierra la sesion
     */
    logout() : Promise<void>{
        return this.afAuth.auth.signOut()
    }

    /**
     * Obtiene el usuario actual
     */
    getUser():Observable<any>{
        return this.afAuth.user;
    }

   

}