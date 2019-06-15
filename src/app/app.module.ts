import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { MyRoutesComponent } from './my-routes/my-routes.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { RouteComponent } from './route/route.component';
import { RunComponent } from './run/run.component';
import { ChartsModule } from 'ng2-charts';
import{ appRoutes } from './app-routing.module';
import { AllRoutesComponent } from './all-routes/all-routes.component'
import { AuthService } from './user/auth.service';
import { MyRunsComponent } from './my-runs/my-runs.component';
import { RunResultsComponent, MinuteSecondsPipe } from './run-results/run-results.component'

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ChartsModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [
    AppComponent,
    ErrorComponent,
    MyRoutesComponent,
    MenuComponent,
    FooterComponent,
    RouteComponent,
    RunComponent,
    AllRoutesComponent,
    MyRunsComponent,
    RunResultsComponent,
    MinuteSecondsPipe
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
