import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorComponent } from './error/error.component';
import { MyRoutesComponent } from './my-routes/my-routes.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { RouteComponent } from './route/route.component';
import { RunComponent } from './run/run.component';
import { AllRoutesComponent } from './all-routes/all-routes.component';
import { MyRunsComponent } from './my-runs/my-runs.component';
import { RunResultsComponent } from './run-results/run-results.component';

const routes: Routes = [
 
  //{ path: 'login', component: LoginComponent},
 // { path: 'welcome/:name', component: WelcomeComponent, canActivate: [RouteGuardService] },
  { path: 'myroutes', component: MyRoutesComponent, canActivate: [RouteGuardService] },
  { path: 'myruns', component: MyRunsComponent, canActivate: [RouteGuardService] },
  { path: 'runresults/:id', component: RunResultsComponent, canActivate: [RouteGuardService] },
//  { path: 'logout', component: LogoutComponent, canActivate: [RouteGuardService] },
  { path: 'route/:id', component: RouteComponent, canActivate: [RouteGuardService] },
  { path: 'run/:id/:action', component: RunComponent /* ,canActivate: [RouteGuardService]* TODO uncomment when session is implemented*/ },
  { path: 'allroutes', component: AllRoutesComponent},
  { path: '', component: AllRoutesComponent},
  { path: 'user', loadChildren: './user/user.module#UserModule' },

  { path: '**', component: AllRoutesComponent } // ALWAYS should be the last
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
