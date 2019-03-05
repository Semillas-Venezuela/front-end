import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { ConstantPool } from "@angular/compiler";

@Injectable()
export class AuthService{
   isAdminVar :boolean
   llamadoDesdeStep:boolean=false;
    constructor(
        private afAuth:AngularFireAuth
    ){
        this.isAdminVar = false;
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

    loginCorreo(email,password):Promise<any>{
        return this.afAuth.auth.signInWithEmailAndPassword(email,password)   
    }
    isAdmin():boolean{
        return this.isAdminVar;
    }
}