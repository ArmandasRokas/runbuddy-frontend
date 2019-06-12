import { Injectable } from '@angular/core'
import { Subject, Observable, of } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { IUser, ILocation } from './user.model'
import { User, Location } from './user'

import { HttpClient } from '@angular/common/http';
import * as UUID from 'uuid'
import { CreateUserComponent } from '../create-user.component';

@Injectable({
    providedIn: 'root'
})
export class UserService{
    constructor(private http: HttpClient ) {
        
    }

    getUser(userName: string):Observable<IUser>{
        return this.http.get<IUser>(`http://localhost:8080/users/${userName}`)
                .pipe(catchError(this.handleError<IUser>('getUser')))
    }

     /*
    getUser(userName: string){
        return this.http.get<User>(`http://localhost:8080/users/${userName}`)
    }*/

    createUser(user) {
        return this.http.post(`http://localhost:8080/users`, user)
        //return this.http.get(`http://localhost:8080/users/hello`)
    } 
    saveUser(user:IUser){
        user.id = UUID.v4()
        user.location.id = UUID.v4()
        
        var userNew = new User(
            user.id, user.userName, user.email, user.password, 
            [
                new Location(
                    user.location.id, user.location.streetName, user.location.streetNumber, 
                    user.location.city, user.location.country
                )
            ] 
        );
        
        USERS.push(user)
        console.log(userNew)
        this.createUser(userNew).subscribe( response => console.log(response) );
    }

    private handleError<T>(operation = 'operation', result?:T){
        return (error:any):Observable<T> => {
            console.error(error);
            return of(result as T)
        }
    }

}

const USERS:IUser[] = [
    {
        id:'1',
        userName:'lamster',
        email:'my@gmail.com',
        password:'hihi',
        location: {
            id:'1',
            streetName: 'Skolegade',
            streetNumber: '5',
            city: 'Lyngby',
            country: 'Denmark'
        } 
    }
]

/*private users:IUser[]
    getUser(id:string):IUser{
        return this.users.find(user => user.id === id);
    }*/

/*getAllRoutes():Observable<IRoute[]>{
        let subject = new Subject<IRoute[]>() //the observable stream
        setTimeout( () => {subject.next(ROUTES); subject.complete();},
                    2000 )
        return subject; 
    }*/
/*  
      retrieveUserById(id) {
        return this.http.get<IUser>(`http://localhost:8080/users/${id}`)
      }

      deleteUser(id) {
        return this.http.delete(`http://localhost:8080/users/${id}`)
      }
      updateUser(user, id) {
        return this.http.put(`http://localhost:8080/users/${id}`, user)
      }
*/
