import { Component, OnInit, ɵCompiler_compileModuleAndAllComponentsAsync__POST_R3__ } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service'
import { Router } from '@angular/router'
import { IUser, ILocation } from './shared/user.model';
import { UserService } from './shared/user.service';
import * as UUID from 'uuid';

@Component({
    templateUrl: './profile.component.html',
    styles: [`
        a { cursor: pointer }
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
    addMode:boolean
    constructor(private authService: AuthService, 
                private router:Router,
                private userService: UserService){

    }
    
    deleteLocation(location:ILocation){
        console.log("user locations before delete location")
        console.log(this.user.locations)

        this.user.locations = this.user.locations.filter(l=>l.id !== location.id);
        
        console.log("user locations after delete location")
        console.log(this.user.locations)
    }

    cancelNewLocation(){
        this.addMode = false;
    }

    saveNewLocation(location:ILocation){
        location.id = UUID.v4();
        console.log("user after add new location")
        console.log(this.user);
        this.user.locations.push(location);
        
        //this.userService.updateUser(this.newUser).subscribe();
        this.addMode = false;
        console.log("user after add new location")
        console.log(this.user);     
    }

    addLocation(){
        this.addMode = true;
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

    }

    saveProfile(formValues){
        if(this.profileForm.valid){
            let u:IUser = {
                id: localStorage.getItem("userId"),
                userName: formValues.userName,
                email: formValues.email,
                password: formValues.password,
                locations: this.user.locations
            }
            console.log("user before update")
            console.log(u)
            this.authService.updateUser(u)
            .subscribe(()=>{
                //this.toastr.success('Profile Saved')
            })
            //this.router.navigate(['myroutes'])
        }
    }


    logout(){
        console.log("user before logout")
        console.log(this.user)

        this.authService.logout();
        this.ngOnInit();

        console.log("user after logout")
        console.log(this.user)

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