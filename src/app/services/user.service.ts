import { Injectable } from "@angular/core";
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';


import {environment} from '../../environments/environment';
const API_URL = environment.API.url;
const ClientId = environment.API.clientId;
const ClientSecret = environment.API.clientSecret;

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
    

    getUsers(): Observable<any> {
        return this.http.get<any[]>(API_URL);
    }


}