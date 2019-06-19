import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { MyRoutesComponent } from './my-routes/my-routes.component';
import { RouteGuardService } from './service/route-guard.service';
import { RouteComponent } from './route/route.component';
import { RunComponent } from './run/run.component';
import { AllRoutesComponent } from './all-routes/all-routes.component';
import { from } from 'rxjs';
import { MyRunsComponent } from './my-runs/my-runs.component';
import { RunResultsComponent } from './run-results/run-results.component';
import {RouteDetailsComponent} from './route-details/route-details.component';
import { GuideComponent } from './guide/guide.component';
import { AboutUsComponent } from './about-us/about-us.component';

export const appRoutes: Routes = [
  { path: 'myroutes', component: MyRoutesComponent, canActivate: [RouteGuardService] },
  { path: 'myruns', component: MyRunsComponent, canActivate: [RouteGuardService] },
  { path: 'runresults/:id', component: RunResultsComponent, canActivate: [RouteGuardService] },
  { path: 'route/:id', component: RouteComponent, canActivate: [RouteGuardService] },
  { path: 'run/:id/:action', component: RunComponent /* ,canActivate: [RouteGuardService]* TODO uncomment when session is implemented*/ },
  { path: 'allroutes', component: AllRoutesComponent},
  { path: '', component: AllRoutesComponent},
  { path: 'user', loadChildren: './user/user.module#UserModule' },
  { path: 'routedetails/:id', component: RouteDetailsComponent},
  { path: 'help', component: GuideComponent },
  { path: 'aboutus', component: AboutUsComponent},
  { path: '**', component: AllRoutesComponent } // ALWAYS should be the last
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
