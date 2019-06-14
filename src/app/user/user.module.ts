import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { userRoutes } from './user.routes'
import { ProfileComponent } from './profile.component'
import { LoginComponent } from './login.component'
import { CreateUserComponent } from './create-user.component'
import { AddUserLocationComponent } from './add-user-location.component'

import { UserService } from './shared/user.service'

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
        AddUserLocationComponent
    ],
    providers: [
        UserService
    ]
})
export class UserModule{

}