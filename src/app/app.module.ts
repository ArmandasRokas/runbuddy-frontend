import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { MyRoutesComponent } from './my-routes/my-routes.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteComponent } from './route/route.component';
import { RunComponent } from './run/run.component';
import { ChartsModule } from 'ng2-charts';
import { AllRoutesComponent } from './all-routes/all-routes.component'
import { AuthService } from './user/auth.service';
import { MyRunsComponent } from './my-runs/my-runs.component'

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    ErrorComponent,
    MyRoutesComponent,
    MenuComponent,
    FooterComponent,
    LogoutComponent,
    RouteComponent,
    RunComponent,
    AllRoutesComponent,
    MyRunsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
