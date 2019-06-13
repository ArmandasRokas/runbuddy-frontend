import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from './shared/user.service'
import { AuthService } from './auth.service';

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
    isDirty:boolean = true
    constructor(private router: Router, 
                private userService: UserService,
                private authService: AuthService){
    }

    saveUser(formValues){
        //save user
        this.userService.saveUser(formValues).subscribe( () => {
            //if ok
            this.isDirty = false

            //login
            this.authService
            .loginUser(formValues.userName, formValues.password);

            //go back to main page
            this.router.navigate([''])
        } );        
    }

    cancel(){
        this.router.navigate([''])
    }
}