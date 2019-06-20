import { Injectable } from '@angular/core'
import { IUser, ILocation } from './shared/user.model'
import { UserService } from './shared/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable, of } from 'rxjs'
import { tap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class AuthService{
    currentUser:IUser
  
    errorMsg:string;
      
    constructor(
        private userService:UserService, 
        private http:HttpClient,
        private toastr: ToastrService)
    {
        this.currentUser = { id:'', userName:'', password:'', email:''}
    }

    ngOnInit(){
        var userName = localStorage.getItem('userName');
        var password = localStorage.getItem('password');
        if(!userName){
            this.logout()
        }else{
            this.loginUser(userName, password); 
        }
    }

    private handleError<T>(operation = 'operation', result?:T){
        return (error:any):Observable<T> => {
            this.toastr.error("invalid user name and/or password");
            this.toastr.error("profile logging error");
            
            this.currentUser = { id:'', userName:'', password:'', email:''}
            this.logout()
                    
            return of(result as T)
        }
    }

    isIUser(u:IUser){
        return (u.id !== undefined) && (u.email !== undefined) &&
               (u.password !== undefined) && (u.userName !== undefined);
    }


    loginUser(userName: string, password: string){
        return this.http.get<IUser>(`http://localhost:8080/users/${userName}`)
                .pipe( tap( (user:any) => {
                    if( this.isIUser(user) && //(typeof user !== 'undefined' && typeof user.userName !== 'undefined' && typeof user.password !== 'undefined') && 
                        (userName === user.userName && password === user.password) 
                    ){
                        user.logged = true;
                        this.currentUser = user;                    
                        localStorage.setItem('loggedIn','true');
                        localStorage.setItem('userId', user.id);
                        localStorage.setItem('userName', user.userName);
                        localStorage.setItem('password', user.password);
                    }else{
                        user.logged = false;
                        this.toastr.error("invalid user name and/or password");
                        this.toastr.error("profile logging error");                                    
                        this.currentUser = { id:'', userName:'', password:'', email:''};
                        this.logout();
                        return of(false);
                    }
                }) )
                .pipe( 
                    catchError( 
                        this.handleError<IUser>("updateUser", {} as IUser) 
                    ) 
                )               
    }

    logout(){
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('password');
     
        this.currentUser = { id:'', userName:'', password:'', email:''}
    }

    isAuthenticated(){
        return JSON.parse( localStorage.getItem('loggedIn') || 'false' );
    }

    updateUser(user:IUser){
        //this.currentUser = user;
        return this.userService.updateUser(user);
        //let options = {headers: new HttpHeaders({'ContentType':'application/json'})};
    //return this.http.put(`http://localhost:8080/users`, this.currentUser, options);
    }

    updateCurrentUser(userName: string, email: string, password: string){
        this.currentUser.userName = userName
        this.currentUser.email = email
        this.currentUser.password = password

        let options = {headers: new HttpHeaders({'ContentType':'application/json'})};
        return this.http.put(`http://localhost:8080/users/${userName}`, this.currentUser, options);
    }
}