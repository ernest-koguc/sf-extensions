import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { toggleDialog } from '../../dom/dialog';
import { PlayerCapturer } from '../../models/player-capturer';
import { greaterThan, updateValidityOf } from '../../validators/validators';

@Component({
  selector: 'captured-player',
  templateUrl: './captured-player.component.html',
  styleUrls: ['./captured-player.component.css']
})
export class CapturedPlayerComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
    this.resetForm();
    }

  @Input('capturer')
  public capturer!: PlayerCapturer;
  @Output()
  public deleteCapturer: EventEmitter<number> = new EventEmitter();

  public showContent: boolean = false;
  public editDialogId: string = 'edit-capturer-dialog' + Date.now();
  form!: FormGroup<{minPid: FormControl<number | null>, maxPid: FormControl<number | null>}>;

  toggleContent() {
    this.showContent = !this.showContent;
  }

  deleteComponent(event: MouseEvent) {
    if (event.button != 1)
    return;

    this.deleteCapturer.emit(this.capturer.id);
  }

  preventScroll(event: MouseEvent) {
    if (event.button == 1)
      event.preventDefault();
  }

  clearPlayer() {
    this.capturer.reset();
  }

  toggleEditDialog(editCapturer: boolean = false) {
    if (editCapturer && this.form.valid) {
      let config = this.form.getRawValue();
      this.capturer.setConfiguration(config.minPid!, config.maxPid!);
    }

    toggleDialog(this.editDialogId)
    this.resetForm();
  }

  resetForm() {
      this.form = new FormGroup({
      minPid: new FormControl<number>(this.capturer.minPid, [Validators.required, Validators.min(0), updateValidityOf('maxGid')]),
      maxPid: new FormControl<number>(this.capturer.maxPid, [Validators.required, Validators.min(0), greaterThan('minGid')])
    });
  }

  public copyToClipBoard(event: Event) {
    event.preventDefault();
    let data = 'Player ID: ' + this.capturer.pid + '\n'
      + 'Player Name: ' + this.capturer.playerName + '\n'
      + 'Guild Joined: ' + this.capturer.guildJoined + '\n'
      + 'Timestamp: ' + this.capturer.timestamp;
    navigator.clipboard.writeText(data);
 }
}
