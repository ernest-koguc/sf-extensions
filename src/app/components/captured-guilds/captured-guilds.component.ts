import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { toggleDialog } from '../../dom/dialog';
import { GuildCapturer } from '../../models/guild-capturer';
import { greaterThan, updateValidityOf } from '../../validators/validators';

@Component({
  selector: 'captured-guilds',
  templateUrl: './captured-guilds.component.html',
  styleUrls: ['./captured-guilds.component.css']
})
export class CapturedGuildsComponent implements OnInit {
  ngOnInit(): void {
    this.resetForm();
  }

  @Input('capturer')
  public capturer!: GuildCapturer;
  @Output()
  deleteCapturer: EventEmitter<number> = new EventEmitter();

  editDialogId: string = 'edit-guild-dialog'+Date.now();
  showContent: boolean = false;
  form!: FormGroup<{minGid: FormControl<number | null>, maxGid: FormControl<number | null>}>;

  deleteComponent(event: MouseEvent) {
    event.preventDefault();

    if (event.button == 1) {
      this.deleteCapturer.emit(this.capturer.id);
    }
  }

  preventScroll(event: MouseEvent) {
    if (event.button == 1)
      event.preventDefault();
  }

  digestGuild(gid: number, name: string) {
    this.capturer.digestGuild(gid, name)
  }

  clearGuilds() {
    this.capturer.guilds = [];
  }
  toggleContent() {
    this.showContent = !this.showContent;
  }

  toggleEditDialog(editCapturer: boolean = false) {
    if (editCapturer && this.form.valid) {
      let config = this.form.getRawValue();
      this.capturer.setConfiguration(config.minGid!, config.maxGid!);
    }

    toggleDialog(this.editDialogId)
    this.resetForm();
  }

  resetForm() {
      this.form = new FormGroup({
      minGid: new FormControl<number>(this.capturer.minGid, [Validators.required, Validators.min(0), updateValidityOf('maxGid')]),
      maxGid: new FormControl<number>(this.capturer.maxGid, [Validators.required, Validators.min(0), greaterThan('minGid')])
    });
  }

  public copyToClipBoard(event: Event) {
    event.preventDefault();
    let data = this.capturer.guilds.map(v => v.gid + ' : ' + v.guildName).join('\n');
    navigator.clipboard.writeText(data);
 }
}

