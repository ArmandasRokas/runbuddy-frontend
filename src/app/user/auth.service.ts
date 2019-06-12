import { Injectable } from '@angular/core'
import { IUser } from './shared/user.model'
import { UserService } from './shared/user.service';

@Injectable()
export class AuthService{
    currentUser:IUser
    constructor(private userService:UserService){
        this.currentUser = { id:'', userName:'', password:'', email:''}
    }

    loginUser(userName: string, password: string){
        this.userService.getUser(userName).subscribe((user:IUser) => {
            if( (typeof user !== 'undefined' && typeof user.userName !== 'undefined' && typeof user.password !== 'undefined') && 
                (userName === user.userName && password === user.password) 
              ) {
                this.currentUser = user;
                localStorage.setItem('loggedIn','true');
            }else{
                this.currentUser = { id:'', userName:'', password:'', email:''}
                localStorage.removeItem('loggedIn');
            }
        }) 
    }

    isAuthenticated(){
        return JSON.parse( localStorage.getItem('loggedIn') || 'false' );
    }
/*
    isAuthenticated(){
        return !!this.currentUser;
    }
*/
    updateCurrentUser(userName: string, email: string, password: string){
        this.currentUser.userName = userName
        this.currentUser.email = email
        this.currentUser.password = password
    }
}