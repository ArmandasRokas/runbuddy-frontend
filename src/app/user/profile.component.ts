import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service'
import { Router } from '@angular/router'

@Component({
    templateUrl: './profile.component.html',
    styles: [`
        em { float: right; color: #E05C65; padding-left: 10px;}
        .error input {background-color: #E3C3C5;}
        .error ::-webkit-input-placeholder {color:#999;}
        .error ::-moz-placeholder {color:#999;}
        .error :-moz-placeholder {color:#999;}
        .error :ms-input-placeholder {color:#999;}
    `]
})

export class ProfileComponent implements OnInit{
    profileForm: FormGroup
    private userName:FormControl
    private email:FormControl
    private password:FormControl    
    constructor(private authService: AuthService, private router:Router){

    }
    ngOnInit(): void {
        this.userName = new FormControl(this.authService.currentUser.userName, 
                                        [Validators.required, Validators.pattern('[a-zA-Z].*')])
        this.email = new FormControl(this.authService.currentUser.email, Validators.required)
        this.password = new FormControl(this.authService.currentUser.password, Validators.required)
        
        this.profileForm = new FormGroup({
            userName: this.userName,
            email: this.email,
            password: this.password
        })
    }

    saveProfile(formValues){
        if(this.profileForm.valid){
            this.authService.updateCurrentUser(formValues.userName, formValues.email, formValues.password)
            this.router.navigate(['myroutes'])
        }
    }

    cancel(){
        this.router.navigate(['myroutes'])
    }

    validateUserName(){        
        return this.userName.valid || this.userName.untouched
    }

    validateEmail(){        
        return this.email.valid || this.email.untouched
    }

    validatePassword(){        
        return this.password.valid || this.password.untouched
    }
    
}