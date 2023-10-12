import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateDtoUser } from '../dto/createDtoUser';
import { LoginDtoUser } from '../dto/loginDtoUser';

@Injectable({
    providedIn:'root'
})
export class GeneralService{
    urlBase = "http://localhost:3000/api"
    headers = {
        //!agregar headers auth!
    }

    constructor(
        private readonly http:HttpClient
    ){}

    getRolesUser(){
        return this.http.get(this.urlBase+"/roles",{
            headers:this.headers
        })
    }
    getUsers(){
        return this.http.get(this.urlBase+"/users",{
            headers: this.headers
        })
    }

}