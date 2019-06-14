import { Injectable } from '@angular/core'
import { IUser } from './shared/user.model'
import { UserService } from './shared/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs'
import { tap, catchError } from 'rxjs/operators';


@Injectable()
export class AuthService{
    currentUser:IUser
    constructor(private userService:UserService, private http:HttpClient){
        this.currentUser = { id:'', userName:'', password:'', email:''}
    }

    loginUser(userName: string, password: string){
        return this.http.get<IUser>(`http://localhost:8080/users/${userName}`)
                .pipe( tap( (user:IUser) => {
                    this.currentUser = user;                    
                    localStorage.setItem('loggedIn','true');
                    localStorage.setItem('userId', user.id);
                    localStorage.setItem('userName', user.userName);
                }))
                .pipe( catchError( err => {
                    this.currentUser = { id:'', userName:'', password:'', email:''}
                    this.logout()
                    /*localStorage.removeItem('loggedIn');
                    localStorage.removeItem('userId');
                    */
                    return of(false)
                }) )       
        /*
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
        */ 
    }

    logout(){
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
    }

    isAuthenticated(){
        //localStorage.removeItem('loggedIn');
        return JSON.parse( localStorage.getItem('loggedIn') || 'false' );
        //return false
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

        let options = {headers: new HttpHeaders({'ContentType':'application/json'})};
        return this.http.put(`http://localhost:8080/users/${userName}`, this.currentUser, options);
    }
}