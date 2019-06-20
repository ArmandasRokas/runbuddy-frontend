import { Component, OnInit, ɵCompiler_compileModuleAndAllComponentsAsync__POST_R3__, ɵɵcontainerRefreshEnd } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service'
import { Router } from '@angular/router'
import { IUser, ILocation } from './shared/user.model';
import { UserService } from './shared/user.service';
import { ToastrService } from 'ngx-toastr'
import * as UUID from 'uuid';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { restrictedWords } from './shared/restricted-words.validator';

@Component({
    templateUrl: './profile.component.html',
    styles: [`
        a { cursor: pointer }
        em { float: right; color: #E05C65; padding-left: 10px;}
        .error input {background-color: #E3C3C5;}
        .error ::-webkit-input-placeholder {color:#999;}
        .error ::-moz-placeholder {color:#999;}
        .error :-moz-placeholder {color:#999;}
        .error :ms-input-placeholder {color:#999;}
    `]
})

export class ProfileComponent implements OnInit{
    public editedUserForm: FormGroup
    public userName:FormControl
    public email:FormControl
    public password:FormControl
    public locations: ILocation[]

    public maxCharsUserName = 10;
    public maxCharsEmail = 100;
    public passwordMinChars = 6;

    loginInvalid = false;
    errorMsg:string;

    addMode:boolean
    constructor(private authService: AuthService, 
                private router:Router,
                private toastr: ToastrService,
                private userService: UserService)
                {
                    this.locations = [] as ILocation[];                    
                }

    ngOnInit(): void {
        this.setupValidators();

        this.updateFromLoggedUser();
        let username = localStorage.getItem('userName');
        let password = localStorage.getItem('password');
        if(!username || !password){
          this.authService.logout();
        }else{
          this.authService.loginUser(username, password)
            .subscribe((user:IUser) =>{
                if(!user){
                    this.authService.logout();
                }else{
                    this.updateFromLoggedUser();      

                    //this.router.navigate(['myroutes']);
                }
            });
        }

    }

    setupValidators(){
        this.userName = new FormControl('',[
            Validators.required, 
            Validators.maxLength(this.maxCharsUserName), 
            restrictedWords(['fuck', 'fucker'])
        ]);
        this.email = new FormControl('',[
            Validators.required,             
            Validators.email, 
            Validators.maxLength(this.maxCharsEmail)
        ]);
        this.password = new FormControl('',[
            Validators.required,
            Validators.minLength(this.passwordMinChars)
        ]);    

        this.editedUserForm = new FormGroup({
            userName: this.userName,
            email: this.email,
            password: this.password
        });
    }

    deleteLocation(location:ILocation){
        this.locations = this.locations.filter(l=>l.id !== location.id);
    }

    cancelNewLocation(){
        this.addMode = false;
    }

    saveNewLocation(location:ILocation){
        location.id = UUID.v4();
        this.locations.push(location);
        
        this.addMode = false;
    }

    addLocation(){
        this.addMode = true;
    }

    updateFromLoggedUser(){
        let user = this.authService.currentUser;
        this.locations = user.locations; 
        this.userName = new FormControl(
            user.userName,
            [
                Validators.required, 
                Validators.maxLength(this.maxCharsUserName), 
                restrictedWords(['fuck', 'fucker'])
            ]
        );

        this.email = new FormControl(
            user.email,
            [
                Validators.required,             
                Validators.email, 
                Validators.maxLength(this.maxCharsEmail)
            ]
        );

        this.password = new FormControl(
            user.password,
            [
                Validators.required,
                Validators.minLength(this.passwordMinChars)
            ]
        );    

        this.editedUserForm = new FormGroup({
            userName: this.userName,
            email: this.email,
            password: this.password
        });


    }

    
    private handleError<T>(operation = 'operation', result?:T){
        return (error:any):Observable<T> => {
            this.errorMsg = error.error.message;
            this.toastr.error(error.error.message);
            this.toastr.error("profile updating error");
            return of(result as T)
        }
    }
    isIUser(u:IUser){
        return (u.id !== undefined) && (u.email !== undefined) &&
               (u.password !== undefined) && (u.userName !== undefined);
    }
    saveProfile(formValues){
        if(this.editedUserForm.valid){
            let u:IUser = {
                id: localStorage.getItem("userId"),
                userName: formValues.userName,
                email: formValues.email,
                password: formValues.password,
                locations: this.locations
            }
            
            this.userService //authService
                .updateUser(u)
                .pipe(catchError(this.handleError<IUser>("updateUser", {} as IUser)))
                .subscribe( (resp)=>{
                    if(this.isIUser(resp)){
                        this.toastr.success('Profile Saved!');
                        this.loginInvalid = false;
                        this.authService.loginUser(resp.userName, resp.password).subscribe();
                    }else{
                        this.loginInvalid = true;
                    } 
                })
        }
    }

    logout(){
        this.authService.logout();
        this.ngOnInit();

        this.router.navigate(['/user/login']);
    }

    cancel(){
        this.router.navigate(['myroutes'])
    }
}