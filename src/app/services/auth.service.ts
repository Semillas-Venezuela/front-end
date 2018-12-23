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

    test(){
        this.loginAnonimo().then(
            (usuario)=>{
                console.log("Inicio Sesion")
                console.log(usuario.user.uid)
                this.getUser().subscribe(
                    (usr)=>{
                        console.log("Obtener usuario")
                        console.log(usr.uid)
                        
                    }
                )
            }
        )
    }

}