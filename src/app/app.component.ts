import { Component, QueryList, ViewChildren, ViewEncapsulation } from '@angular/core';
import { CapturedGuildsComponent } from './components/captured-guilds/captured-guilds.component';
import { CapturedPlayerComponent } from './components/captured-player/captured-player.component';
import { toggleDialog } from './dom/dialog';
import { GuildCapturer } from './models/guild-capturer';
import { PlayerCapturer } from './models/player-capturer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  constructor() {
    document.addEventListener("SFHelper_UpdateState", (e) => {
      let event = e as CustomEvent;
      this.digestResponse(event.detail);
    });
  }

  @ViewChildren(CapturedGuildsComponent)
  public guildComponents!: QueryList<CapturedGuildsComponent>;
  @ViewChildren(CapturedPlayerComponent)
  public playerComponents!: QueryList<CapturedPlayerComponent>;

  public guildCapturers: GuildCapturer[] = [new GuildCapturer(0, 999999, 'Default')];
  public playerCapturers: PlayerCapturer[] = [new PlayerCapturer(0, 10000, 'Default')];
  public isTrackingEnabled: boolean = true;
  public showWindow: boolean = true;

  public configurationDialogID: string = 'configuration-dialog';
  public addGuildCapturerDialogId: string = 'add-guild-capturer'
  public addPlayerCapturerDialogId: string = 'add-player-capturer'

  addGuildCapturer(form?: { name: string, minGid: number, maxGid: number}) {
    toggleDialog(this.addGuildCapturerDialogId)

    if (form) {
      let capturer = new GuildCapturer(form.minGid, form.maxGid, form.name)
      this.guildCapturers.push(capturer);
    }
  }

  deleteGuildCapturer(id: number) {
    this.guildCapturers = this.guildCapturers.filter(v => v.id != id);
  }

  addPlayerCapturer(form?: { name: string, minPid: number, maxPid: number }) {
    toggleDialog(this.addPlayerCapturerDialogId);

    if (form) {
      let capturer = new PlayerCapturer(form.minPid, form.maxPid, form.name)
      this.playerCapturers.push(capturer);
    }
  }

  deletePlayerCapturer(id: number) {
    this.playerCapturers = this.playerCapturers.filter(v => v.id != id);
  }

  public toggleTracking() {
    this.isTrackingEnabled = !this.isTrackingEnabled;
  }

  public toggleWindow() {
    this.showWindow = !this.showWindow;
  }

  private digestResponse(body: string) {
    if (!this.isTrackingEnabled)
      return;

    if (body.startsWith('othergroup.groupSave:')) {
      this.updateGuilds(body);
      return;
    }

    if (body.startsWith('otherplayergroupname.r:')) {
      this.digestPlayer(body);
    }
  }

  private digestPlayer(body: string) {
    let start = body.indexOf(':', 23);
    let data = body.substring(start + 1, start+10).split('/');
    let playerId = parseInt(data[0]);
    


    if (isNaN(playerId))
     return;

    let splitData = body.split('/');
    let guildJoined = parseInt(splitData[166]);

    if (guildJoined == 0)
      return;

    let validCapturers = this.playerCapturers.filter(p => p.isPlayerValid(playerId));

    if (!validCapturers)
      return;

    let name = splitData[260];
    name = name.split(':')[2].split('&')[0];

    for (let capturer of validCapturers) {
      capturer.digestPlayer(playerId, guildJoined, name)
    }
  }

  private updateGuilds(body: string) {
    let gid = parseInt(body.substring(21, 34).split('/')[0]);
    let splitData = body.split('/');
    let guildName = splitData[491].split('&')[3].substring(17);

    for (let capturer of this.guildComponents) {
      capturer.digestGuild(gid, guildName);
    }
  }
}
