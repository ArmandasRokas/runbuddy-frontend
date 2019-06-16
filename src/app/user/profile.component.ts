import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service'
import { Router } from '@angular/router'
import { IUser } from './shared/user.model';
import { UserService } from './shared/user.service';

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
    user:IUser
    constructor(private authService: AuthService, 
                private router:Router,
                private userService: UserService){

    }

    ngOnInit(): void {
              //
              this.user = this.authService.currentUser
              this.userName = new FormControl(this.authService.currentUser.userName, 
                                              [Validators.required, Validators.pattern('[a-zA-Z].*')])
              this.email = new FormControl(this.authService.currentUser.email, Validators.required)
              this.password = new FormControl(this.authService.currentUser.password, Validators.required)
              
              this.profileForm = new FormGroup({
                  userName: this.userName,
                  email: this.email,
                  password: this.password
              })


        let username = localStorage.getItem('userName');
        if(!username){
          this.authService.logout();
        }else{
          this.userService.getUser(username).subscribe( (user:IUser) => {
            if(!user){
              this.authService.logout();
            }else{
              localStorage.setItem('userName', user.userName);
              localStorage.setItem('password', user.password);
              localStorage.setItem('userId', user.id);
              this.authService.currentUser = user;


              //
              this.user = this.authService.currentUser
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
          })
        }
        /*
        this.user = this.authService.currentUser
        this.userName = new FormControl(this.authService.currentUser.userName, 
                                        [Validators.required, Validators.pattern('[a-zA-Z].*')])
        this.email = new FormControl(this.authService.currentUser.email, Validators.required)
        this.password = new FormControl(this.authService.currentUser.password, Validators.required)
        
        this.profileForm = new FormGroup({
            userName: this.userName,
            email: this.email,
            password: this.password
        })

        */
    }

    saveProfile(formValues){
        if(this.profileForm.valid){
            this.authService.updateCurrentUser(formValues.userName, formValues.email, formValues.password)
            .subscribe(()=>{
                //this.toastr.success('Profile Saved')
            })
            //this.router.navigate(['myroutes'])
        }
    }

    logout(){
        this.authService.logout();
        this.router.navigate(['/user/login']);
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