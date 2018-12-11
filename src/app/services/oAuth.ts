import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Token } from "../models/token";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment.prod";

@Injectable()
export class oAuth{
    constructor(private http:HttpClient){
    }



    public getTokenObservable(authCredentials:any):Observable<any>{
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/x-www-form-urlencoded'
            })
        };
        return this.http.post(environment.API.url+"auth/token", authCredentials,httpOptions);
    }
    public setAuthToken():void{
        let authCredentials = {
            grant_type:"password",
            client_id:environment.API.clientId,
            client_secret: environment.API.clientSecret,
            username:environment.API.generalUserCredentials.username,
            password:environment.API.generalUserCredentials.password
        }
        this.getTokenObservable(authCredentials).subscribe(
            (token:Token)=>{
                alert(token.access_token);
            }
        )
    }
}