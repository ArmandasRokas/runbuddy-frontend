import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
    templateUrl: './add-user-location.component.html'
})


export class AddUserLocationComponent implements OnInit{
    newLocationForm: FormGroup
    id: FormControl
    title: FormControl
    streetName: FormControl
    streetNumber: FormControl
    city: FormControl
    country: FormControl
    
    ngOnInit(): void {
        this.title = new FormControl('',[Validators.required, Validators.maxLength(80)])
        this.streetName = new FormControl('',Validators.required)
        this.streetNumber = new FormControl('',Validators.required)
        this.city = new FormControl('',Validators.required)
        this.country = new FormControl('',Validators.required)
   
        this.newLocationForm = new FormGroup({
            id: this.id,
            title: this.title,
            streetName: this.streetName,
            streetNumber: this.streetNumber,
            city: this.city,
            country: this.country
        })
    }

    saveLocation(formValues){
        console.log(formValues)
    }    
}