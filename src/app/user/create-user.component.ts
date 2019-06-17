import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from './shared/user.service'
import { AuthService } from './auth.service';
import { IUser, ILocation } from './shared/user.model';
import * as UUID from 'uuid';

@Component({
    templateUrl:'create-user.component.html',
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

export class CreateUserComponent{
    newUser:IUser
    userName
    isDirty:boolean = true;
    loginInvalid = false;
    addMode:boolean;

    constructor(private router: Router, 
                private userService: UserService,
                private authService: AuthService){
                    this.newUser = {
                        id:'',
                        userName: '',
                        email: '',
                        password: '',
                        locations: []
                    }                    
        
    }

    saveUser(formValues){
        formValues.locations = this.newUser.locations
        console.log(formValues.locations)
        console.log(this.newUser)
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

    addLocation(){
        this.addMode = true;
    }

    deleteLocation(location:ILocation){
        this.newUser.locations = this.newUser.locations.filter(l=>l.id !== location.id);
    }

    saveNewLocation(location:ILocation){
        location.id = UUID.v4();
        console.log(this.newUser)
        this.newUser.locations.push(location);
        //this.userService.updateUser(this.newUser).subscribe();
        this.addMode = false;
        console.log(this.newUser)
        /*
        if(typeof this.newUser == "undefined"){
            this.newUser = {
                id:'',
                userName: '',
                email: '',
                password: '',
                locations: [location]
            }                    
            console.log(this.newUser)
            //this.newUser.locations.push(location);
            //this.userService.updateUser(this.newUser).subscribe();
            this.addMode = false;
        }else{
            this.newUser.locations.push(location);
            //this.userService.updateUser(this.newUser).subscribe();
            this.addMode = false;
        }*/
    }

    cancelNewLocation(){
        this.addMode = false;
    }


}