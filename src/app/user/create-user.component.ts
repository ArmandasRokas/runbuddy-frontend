import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from './shared/user.service'
import { AuthService } from './auth.service';
import { IUser, ILocation } from './shared/user.model';
import * as UUID from 'uuid';
import { catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { restrictedWords } from './shared/restricted-words.validator';
import { ToastrService } from 'ngx-toastr';

@Component({
    templateUrl:'create-user.component.html',
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

export class CreateUserComponent implements OnInit{
    public newUserForm: FormGroup
    public userName: FormControl
    public email: FormControl
    public password: FormControl
    public locations: ILocation[]

    public maxCharsUserName = 10;
    public maxCharsEmail = 100;
    public passwordMinChars = 6;

    isDirty:boolean = true;
    loginInvalid = false;
    errorMsg:string;
    addMode:boolean;    
    passwordButtonText: 'show';
    
    constructor(
        private router: Router, 
        private userService: UserService,
        private authService: AuthService,
        private toastr: ToastrService)
    {
        this.locations = [] as ILocation[];                    
    }

    ngOnInit():void{
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

        this.newUserForm = new FormGroup({
            userName: this.userName,
            email: this.email,
            password: this.password
        })
    }

    private handleError<T>(operation = 'operation', result?:T){
        return (error:any):Observable<T> => {
            this.errorMsg = error.error.message;
            this.toastr.error(error.error.message);
            this.toastr.error("profile saving error");
            return of(result as T)
        }
    }

    isIUser(u:IUser){
        return (u.id !== undefined) && (u.email !== undefined) &&
               (u.password !== undefined) && (u.userName !== undefined);
    }

    saveUser(formValues){
        formValues.locations = this.locations
        console.log(formValues.locations)
    
        //save user
        this.userService
            .saveUser(formValues)
            .pipe(catchError(this.handleError<IUser>("saveUser", {} as IUser)) )
            .subscribe( (saveResp) => {
                if(!this.isIUser(saveResp)){//if userName is already taken
                    this.loginInvalid = true;
                    //this.userName = formValues.userName; //TODO this will show the wrong username
                }else{ //if userName not taken
                    //if ok
                    this.isDirty = false

                    //login
                    this.login(formValues.userName, formValues.password);
                }
       });        
    }

    login(userName, password){
        this.authService
            .loginUser(userName, password)
            .subscribe(resp =>{
                if(!resp){
                    this.loginInvalid = true;
                }else{
                    this.router.navigate(['myroutes']);
                }
            })
    }

    cancel(){
        this.router.navigate([''])
    }

    addLocation(){
        this.addMode = true;
    }

    deleteLocation(location:ILocation){
        this.locations = this.locations.filter(l=>l.id !== location.id);
    }

    saveNewLocation(location:ILocation){
        location.id = UUID.v4();
        this.locations.push(location);
        this.addMode = false;
    }

    cancelNewLocation(){
        this.addMode = false;
    }
}