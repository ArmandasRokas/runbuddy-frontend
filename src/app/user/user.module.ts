import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { userRoutes } from './user.routes'
import { ProfileComponent } from './profile.component'
import { LoginComponent } from './login.component'
import { CreateUserComponent } from './create-user.component'
import { AddUserLocationComponent } from './add-user-location.component'
import { LocationListComponent } from './location-list.component'

import { UserService } from './shared/user.service'
import { PasswordToggleDirective, JQUERY } from '../common/index';
let jQuery = window['$'];

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(userRoutes)
    ],
    declarations: [
        ProfileComponent,
        LoginComponent,
        CreateUserComponent,
        AddUserLocationComponent,
        LocationListComponent,
        PasswordToggleDirective
    ],
    providers: [
        UserService,
        {provide: JQUERY, useValue: jQuery}
    ]
})
export class UserModule{ }