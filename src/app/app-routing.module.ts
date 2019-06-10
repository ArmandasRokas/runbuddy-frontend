import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { MyRoutesComponent } from './my-routes/my-routes.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { RouteComponent } from './route/route.component';
import { RunComponent } from './run/run.component';
import { AllRoutesComponent } from './all-routes/all-routes.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [RouteGuardService] },
  { path: 'login', component: LoginComponent},
  { path: 'welcome/:name', component: WelcomeComponent, canActivate: [RouteGuardService] },
  { path: 'myroutes', component: MyRoutesComponent, canActivate: [RouteGuardService] },
  { path: 'logout', component: LogoutComponent, canActivate: [RouteGuardService] },
  { path: 'route/:id', component: RouteComponent, canActivate: [RouteGuardService] },
  { path: 'run/:id', component: RunComponent, canActivate: [RouteGuardService] },
  { path: 'allroutes', component: AllRoutesComponent, canActivate: [RouteGuardService] }, 

  { path: '**', component: ErrorComponent } // ALWAYS should be the last
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
