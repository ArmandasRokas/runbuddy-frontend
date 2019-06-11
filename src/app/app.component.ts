import { Component } from '@angular/core';

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
  title = 'runbuddy';
}
