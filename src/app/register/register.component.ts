import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GeneralService } from '../services/generalServices.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authtentication.service';

interface roles{
  name:string,
  id:string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  roles: roles[] = [];
  constructor(private readonly snackBar: MatSnackBar, private readonly service: GeneralService, private readonly auth:AuthenticationService, private readonly router: Router) {
    this.service.getRolesUser().subscribe({
      next: (data:any) => {
        //this.roles
        data.forEach((element: any) => {
          this.roles.push({ id: element._id, name:element.name})
        });
      },
    })
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
  get role(){
    let password = this.formUser.get("role")
    return password?.invalid
  }
  formUser = new FormGroup({
    'email': new FormControl('',[Validators.required, Validators.email]),
    'password': new FormControl('',[Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),
    'role': new FormControl('',Validators.required)
  })
  ngOnInit() {
    console.log(this.roles)
  }

  register(){
    if(this.formUser.valid){
      let idRole = ""
      for(var item of this.roles){
        if(item.name == this.formUser.value.role){
          idRole = item.id;
          break;
        }
      }
      let data={
        email:this.formUser.value.email,
        password: this.formUser.value.password,
        role: idRole
      }
      console.log(idRole);
      this.auth.registerUser(data).subscribe({
        next: (data:any) => {
          sessionStorage.setItem("token",data.token)
          console.log(data)
          this.router.navigate(['home']);
        },
      })
    }
  }
}
