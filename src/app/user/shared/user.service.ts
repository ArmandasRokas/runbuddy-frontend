import { Injectable } from '@angular/core'
import { Subject, Observable } from 'rxjs'
import { IUser, ILocation } from './user.model'
import { HttpClient } from '@angular/common/http';
import * as UUID from 'uuid'
import { CreateUserComponent } from '../create-user.component';


@Injectable()
export class UserService{     
    newUser:IUser
    constructor(private http: HttpClient ) { }
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
    createUser(user) {
        return this.http.post(`http://localhost:8080/users`, user)
        //return this.http.get(`http://localhost:8080/users/hello`)
    } 
     
    saveUser(user:IUser){
        user.id = UUID.v4()
        user.location = UUID.v4()
        
        this.newUser.id = user.id
        this.newUser.userName = user.userName
        this.newUser.email = user.email
        this.newUser.password = user.password
        this.newUser.locations.push(user.location);
            
        //user.locations[] = new Array<ILocation>
        //user.locations[] = user.location
        
        USERS.push(user)
        //console.log(user)
        console.log(this.newUser)
        this.createUser(this.newUser).subscribe( response => console.log(response) );
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
