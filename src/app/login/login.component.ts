import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authtentication.service';
import { Router } from '@angular/router';
import { GeneralService } from '../services/generalServices.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isFormValid = false;
  areCredentialsInvalid = false;

  constructor( private readonly snackBar: MatSnackBar, private readonly service: AuthenticationService, private readonly router: Router) {
      sessionStorage.clear();
  }
  get email(){
    let email = this.formUser.get("email")
    if(email?.invalid){
      if(email?.errors?.["required"]){
        return "required"
      }else{
        return "format"
      }
    }
    return "";
  }

  get pass(){
    let password = this.formUser.get("password")
    if(password?.invalid){
      if(password?.errors?.["required"]){
        return "required"
      }else{
        return "pattern"
      }
    }
    return ""
  }
  formUser = new FormGroup({
    'email': new FormControl('',[Validators.required, Validators.email]),
    'password': new FormControl('',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)])
  })

  login(){
    if(this.formUser.valid){
      let data={
        email:this.formUser.value.email,
        password: this.formUser.value.password
      }
      this.service.loginUser(data).subscribe({
          next: (data:any) => {
            sessionStorage.setItem("token",data.token)
            this.router.navigate(['home']);
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
            switch(error.error.message) {
              case "email invalid": {
                console.log("email")
                this.snackBar.open('Correo electronico no registrado');
                break;
              }
              case "password invalid": {
                this.snackBar.open('Contraseña incorrecta');
                break;
              }
              default: {
                this.snackBar.open('Error al iniciar sesión');
              }
            }
          }
        })
    }
  }
}
