import { Component, OnInit, Output, EventEmitter} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { ILocation } from './shared/user.model'
import { restrictedWords } from './shared/restricted-words.validator'


@Component({
    selector: 'add-user-location',
    templateUrl: './add-user-location.component.html',
    styles: [`
        em { float: right; color: #E05C65; padding-left: 10px;}
        .error input {background-color: #E3C3C5;}
        .error ::-webkit-input-placeholder {color:#999;}
        .error ::-moz-placeholder {color:#999;}
        .error :-moz-placeholder {color:#999;}
        .error :ms-input-placeholder {color:#999;}
    `]
})

export class AddUserLocationComponent implements OnInit{
    @Output() saveNewLocation = new EventEmitter()
    public newLocationForm: FormGroup
    //public id: FormControl
    public title: FormControl
    public streetName: FormControl
    public streetNumber: FormControl
    public city: FormControl
    public country: FormControl
    
    ngOnInit(): void {
        this.title = new FormControl('',[
            Validators.required, 
            Validators.maxLength(80), 
            restrictedWords(['fuck', 'fucker'])])
        this.streetName = new FormControl('',Validators.required)
        this.streetNumber = new FormControl('',Validators.required)
        this.city = new FormControl('',Validators.required)
        this.country = new FormControl('',Validators.required)
   
        this.newLocationForm = new FormGroup({
            //id: this.id,
            title: this.title,
            streetName: this.streetName,
            streetNumber: this.streetNumber,
            city: this.city,
            country: this.country
        })
    }

    saveLocation(formValues){
        let location:ILocation = {
            id: undefined,
            title: formValues.title,
            streetName: formValues.streetName,
            streetNumber: formValues.streetNumber,
            city: formValues.city,
            country: formValues.country
        }
        this.saveNewLocation.emit(location);
    }    
}