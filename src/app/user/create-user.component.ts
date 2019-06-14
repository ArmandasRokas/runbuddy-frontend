import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from './shared/user.service'
import { AuthService } from './auth.service';
import { IUser } from './shared/user.model';

@Component({
    templateUrl:'create-user.component.html',
    styles: [`
        em { float: right; color: #E05C65; padding-left: 10px;}
        .error input {background-color: #E3C3C5;}
        .error ::-webkit-input-placeholder {color:#999;}
        .error ::-moz-placeholder {color:#999;}
        .error :-moz-placeholder {color:#999;}
        .error :ms-input-placeholder {color:#999;}
    `]
})

export class CreateUserComponent{
    newUser
    userName
    isDirty:boolean = true
    loginInvalid = false;
    constructor(private router: Router, 
                private userService: UserService,
                private authService: AuthService){
    }

    saveUser(formValues){
        
        //save user
        this.userService.saveUser(formValues).subscribe( (saveResp) => {
            //console.log(user);
            if(!saveResp){//if userName is already taken
                this.loginInvalid = true;
                this.userName = formValues.userName;
            }else{ //if userName not taken
                //if ok
                this.isDirty = false

                //login
                this.authService
                    .loginUser(formValues.userName, formValues.password)
                    .subscribe(resp =>{
                        if(!resp){
                            this.loginInvalid = true;
                        }else{
                            this.router.navigate(['myroutes']);
                        }
                    })
            }

            //go back to main page
            //this.router.navigate([''])
        });        
    }

    cancel(){
        this.router.navigate([''])
    }
}