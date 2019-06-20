import { Component } from '@angular/core'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { IUser } from './shared/user.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
    templateUrl: './login.component.html',
    styles:[`
        em { float: right; color:#E05C65; padding-left:10px; }
    `]
})

export class LoginComponent{
    userName
    password 
    mouseoverLogin
    loginInvalid = false;
  
    constructor(private authService:AuthService, 
                private router:Router)
    {  

    }
    
    login(formValues){
        this.authService
        .loginUser( formValues.userName, formValues.password)
        .subscribe( resp =>{
            if(typeof resp == "undefined" || !resp.logged){
                this.loginInvalid = true;
            }else{            
                this.router.navigate(['myroutes']);
            }
        })
    }
    cancel(){
        this.router.navigate([''])
    }
}