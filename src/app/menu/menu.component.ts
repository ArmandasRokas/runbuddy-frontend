import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { UserService } from '../user/shared/user.service';
import { IUser } from '../user/shared/user.model';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  constructor(
    private auth: AuthService, 
    private userService: UserService) 
  {  }

  ngOnInit() {
    let userName = localStorage.getItem('userName');
    if(!userName){
      this.auth.logout();
    }else{
      this.userService.getUser(userName).subscribe( (user:IUser) =>
      {
        if(!user){
          this.auth.logout();
        }else{
          localStorage.setItem('userName', user.userName);
          localStorage.setItem('password', user.password);
          localStorage.setItem('userId', user.id);
          this.auth.currentUser = user;
        }
      }

      )
    }
  }

  logout() {
    this.auth.logout();
  }

  get userName():any{
    return localStorage.getItem('userName');
  }
}
