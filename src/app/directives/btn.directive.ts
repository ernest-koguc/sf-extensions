import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[btn]'
})
export class BtnDirective {

  constructor(private element: ElementRef) {
    let el = this.element.nativeElement as HTMLButtonElement;
    el.classList.add('btn');
  }

}
