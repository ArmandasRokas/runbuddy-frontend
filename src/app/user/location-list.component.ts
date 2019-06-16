import {Component, Input} from '@angular/core'
import { ILocation } from './shared/user.model';

@Component({
    selector: 'location-list',
    templateUrl: './location-list.component.html'
})

export class LocationListComponent{
    @Input() locations:ILocation[]
}