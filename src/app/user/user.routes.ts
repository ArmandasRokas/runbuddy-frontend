import { ProfileComponent } from './profile.component'
import { LoginComponent } from './login.component'
import { CreateUserComponent } from './create-user.component';
import { AddUserLocationComponent } from './add-user-location.component';

export const userRoutes = [
    {path: 'profile', component: ProfileComponent},
    {path: 'login', component: LoginComponent},
    {path: 'new', component: CreateUserComponent},
    {path: 'location/new', component: AddUserLocationComponent },

]
