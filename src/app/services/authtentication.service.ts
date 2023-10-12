import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateDtoUser } from '../dto/createDtoUser';
import { LoginDtoUser } from '../dto/loginDtoUser';
import { catchError, throwError } from 'rxjs';

@Injectable({
    providedIn:'root'
})

export class AuthenticationService{
    urlBase = "http://localhost:3000/api"
    headers = {
        'Authorization': 'Bearer '+ sessionStorage.getItem('token')
    }
    constructor(
        private http:HttpClient
    ){}

    registerUser( createDtoUser: CreateDtoUser){
        return this.http.post(this.urlBase+"/auth/register",createDtoUser,{
            headers:this.headers
        });
    }
    loginUser(loginDtoUser: LoginDtoUser){
        return this.http.post(`${this.urlBase}/auth/login`,loginDtoUser,{
            headers:this.headers
        })
    }
    isloggedin(){
        return sessionStorage.getItem('token')!=null;
    }

}