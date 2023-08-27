import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { greaterThan, updateValidityOf } from '../../validators/validators';

@Component({
  selector: 'add-player-capturer',
  templateUrl: './add-player-capturer.component.html'
})
export class AddPlayerCapturerComponent {

  constructor() { }
  public form: FormGroup = new FormGroup({
    name: new FormControl<string | null>(null, [Validators.required]),
    maxPid: new FormControl<number | null>(null, [Validators.required, Validators.min(0), greaterThan('minPid')]),
    minPid: new FormControl<number | null>(null, [Validators.required, Validators.min(0), updateValidityOf('maxPid')])
  })

  @Output()
  onFormSave: EventEmitter<{ name: string, maxPid: number, minPid: number }> = new EventEmitter();

  add(): void {
    if (this.form.valid)
      this.onFormSave.emit(this.form.getRawValue());

    this.form.reset();
  }

  cancel() {
    this.onFormSave.emit();
    this.form.reset();
  }
}
