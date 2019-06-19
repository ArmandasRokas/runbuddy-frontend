import { Directive, OnInit, Inject, ElementRef, Input } from '@angular/core';
import { JQUERY } from './jQuery.service'

@Directive({
    selector: '[password-toggle]'
})

export class PasswordToggleDirective implements OnInit{
    private element: HTMLElement;
    @Input('password-toggle') passwordToggleId:string;
    constructor(elementWhichDirectiveOn: ElementRef, @Inject(JQUERY) private $: any){
        this.element = elementWhichDirectiveOn.nativeElement;
    }
    ngOnInit(){
        this.element.addEventListener('change', event => {
            this.$(`#${this.passwordToggleId}`).attr('type', 
                (this.$(`#${this.passwordToggleId}`).attr('type')=='password') ? 'text' : 'password');
        });
    }
}