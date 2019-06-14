import { Component } from '@angular/core';
//import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  template: `
     <app-menu></app-menu>
     <div class="container">
        <router-outlet ></router-outlet>
     </div>
     <app-footer></app-footer>
  ` 
})
export class AppComponent {
  /*constructor(private auth:AuthService){

  }

  ngOnInit(){
    this.auth.isAuthenticated()
  }*/
}
