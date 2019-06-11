import { Injectable } from '@angular/core'
import { IUser } from './shared/user.model'

@Injectable()
export class AuthService{
    currentUser:IUser
    loginUser(userName: string, password: string){
        this.currentUser = {
            id: 'some_random_id',
            userName: userName,
            email: 'bob@hihi.com',
            password: 'Marley'
        }
    }
    isAuthenticated(){
        return !!this.currentUser;
    }

    updateCurrentUser(userName: string, email: string, password: string){
        this.currentUser.userName = userName
        this.currentUser.email = email
        this.currentUser.password = password
    }
}