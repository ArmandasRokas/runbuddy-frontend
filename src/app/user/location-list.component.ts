import {Component, Input, Output, EventEmitter} from '@angular/core'
import { ILocation } from './shared/user.model';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
//import { EventEmitter } from 'protractor';

@Component({
    selector: 'location-list',
    templateUrl: './location-list.component.html'
})

export class LocationListComponent{
    @Input() locations:ILocation[]
    @Output() deleteLocation = new EventEmitter()
    
    delete(location:ILocation){        
        this.deleteLocation.emit(location)    
    }
}

