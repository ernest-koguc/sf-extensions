import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { greaterThan, updateValidityOf } from '../../validators/validators';

@Component({
  selector: 'add-guild-capturer',
  templateUrl: './add-guild-capturer.component.html'
})
export class AddGuildCapturerComponent {

  constructor() { }
  public form: FormGroup = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required]),
    maxGid: new FormControl<number | null>(null, [Validators.required, Validators.min(0), greaterThan('minGid')]),
    minGid: new FormControl<number | null>(null, [Validators.required, Validators.min(0), updateValidityOf('maxGid')])
  })

  @Output()
  onFormSave: EventEmitter<{ name: string, maxGid: number, minGid: number }> = new EventEmitter();

  add(): void {
    if (this.form.valid)
      this.onFormSave.emit(this.form.getRawValue());

    this.form.reset();
  }

  cancel() {
    this.onFormSave.emit();
    this.form.reset();
  }

//  ngOnInit(): void {
//    let elements = document.getElementsByTagName('input');
//    for (let i = 0; i < elements.length; i++) {
//      let input = elements[i];

//      input.onkeydown = (event) => input.value += event.key;
//    }
//  }
//  ngDoCheck(): void {
//  }
}
