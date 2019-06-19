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
    
    //newUser:IUser;
    //userName;
    isDirty:boolean = true;
    loginInvalid = false;
    addMode:boolean;
    errorMsg:string;
    passwordButtonText: 'show';
    constructor(private router: Router, 
                private userService: UserService,
                private authService: AuthService){
                    this.locations = [] as ILocation[];
                    /*this.newUser = {
                        id:'',
                        userName: '',
                        email: '',
                        password: '',
                        locations: []
                    }*/            

        
    }

    ngOnInit():void{
        this.userName = new FormControl('',[
            Validators.required, 
            Validators.maxLength(10), 
            restrictedWords(['fuck', 'fucker'])
        ]);
        this.email = new FormControl('',[
            Validators.required, Validators.maxLength(100)
        ]);
        this.password = new FormControl('',[
            Validators.required, 
            Validators.minLength(6)
        ]);    

        this.newUserForm = new FormGroup({
            userName: this.userName,
            email: this.email,
            password: this.password
        })
    }

    private handleError<T>(operation = 'operation', result?:T){
        return (error:any):Observable<T> => {
            console.error(error.error.message);
            console.error(result);
            //this.toastr.error(error.error.message);
            //this.toastr.error("profile saving error!");
            this.errorMsg = error.error.message;
            return of(result as T)
        }
    }

    isIUser(u:IUser){
        return (u.id !== undefined) && (u.email !== undefined) &&
               (u.password !== undefined) && (u.userName !== undefined);
    }

    saveUser(formValues){
        //formValues.locations = this.newUser.locations
        formValues.locations = this.locations
        console.log(formValues.locations)
        //console.log(this.newUser)
        //save user
        this.userService.saveUser(formValues)
            .pipe( catchError(this.handleError<IUser>("updateUser", {} as IUser)) )
            .subscribe( (saveResp) => {
            //console.log(user);
            if(!this.isIUser(saveResp)){//if userName is already taken
                this.loginInvalid = true;
                this.userName = formValues.userName; //TODO this will show the wrong username
            }else{ //if userName not taken
                //if ok
                this.isDirty = false

                //login
                this.login(formValues.userName, formValues.password);
            }

            //go back to main page
            //this.router.navigate([''])
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
        //this.newUser.locations = this.newUser.locations.filter(l=>l.id !== location.id);
        this.locations = this.locations.filter(l=>l.id !== location.id);
    }

    saveNewLocation(location:ILocation){
        location.id = UUID.v4();
        //console.log(this.newUser)
        //this.newUser.locations.push(location);
        this.locations.push(location);
        //this.userService.updateUser(this.newUser).subscribe();
        this.addMode = false;
        //console.log(this.newUser)
        /*
        if(typeof this.newUser == "undefined"){
            this.newUser = {
                id:'',
                userName: '',
                email: '',
                password: '',
                locations: [location]
            }                    
            console.log(this.newUser)
            //this.newUser.locations.push(location);
            //this.userService.updateUser(this.newUser).subscribe();
            this.addMode = false;
        }else{
            this.newUser.locations.push(location);
            //this.userService.updateUser(this.newUser).subscribe();
            this.addMode = false;
        }*/
    }

    cancelNewLocation(){
        this.addMode = false;
    }


}