import { Directive, OnInit, Inject, ElementRef } from '@angular/core';
import { JQUERY } from './jQuery.service'

@Directive({
    selector: '[password-toggle]'
})

export class PasswordToggleDirective implements OnInit{
    private element: HTMLElement;
    constructor(elementWhichDirectiveOn: ElementRef, @Inject(JQUERY) private $: any){
        this.element = elementWhichDirectiveOn.nativeElement;
    }
    ngOnInit(){
        this.element.addEventListener('change', event => {
            this.$('#passwordOnCreateUser').attr('type', 
                (this.$('#passwordOnCreateUser').attr('type')=='password') ? 'text' : 'password');
        });
    }
}
