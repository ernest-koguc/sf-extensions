import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Guild } from './models/guild';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    document.addEventListener("SFHelper_UpdateState", (e) => {
      let event = e as CustomEvent;
      this.digestResponse(event.detail);
    });
  }
  public isTrackingEnabled: boolean = true;
  public currentPid: number = 99999999;
  public playerName: string = '-';
  public guildJoinedDate: string = '-';
  public guildJoined: number = Date.now();
  public minimumPid = new FormControl<number>(10000);
  public showWindow: boolean = true;
  public capturedGuilds: Guild[] = [];
  public showGuilds: boolean = false;

  get playerId(): string {
    return this.currentPid == 99999999 ? '-' : this.currentPid.toString();
  }

  public toggleGuilds() {
    this.showGuilds = !this.showGuilds;
  }

  public clearGuilds() {
    this.capturedGuilds = [];
  }

  public toggleTracking() {
    this.isTrackingEnabled = !this.isTrackingEnabled;
  }

  public clearPlayer() {
    this.currentPid = 99999999;
    this.playerName = '-';
    this.guildJoinedDate = '-';
    this.guildJoined = Date.now();
  }

  public togglePlugin() {
    this.showWindow = !this.showWindow;
  }

  public toggleDialog() {
    const dialog = document.getElementById('configuration-dialog');
    if (!dialog)
      return;

    const modal = dialog as HTMLDialogElement;

    if (!modal.open) {
      modal.showModal();
     
      return;
    }
    modal.close();
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
    

    let minVal = this.minimumPid.value ?? 10000;

    if (playerId > minVal || isNaN(playerId))
     return;

    let splitData = body.split('/');
    let guildJoined = parseInt(splitData[166]);

    if (guildJoined == 0)
      return;

    if (guildJoined > this.guildJoined)
      return;

    let nameString = splitData[260];

    this.currentPid = playerId;
    this.guildJoined = guildJoined;
    this.guildJoinedDate = new Date(this.guildJoined * 1000).toDateString();    
    this.playerName = nameString.split(':')[2].split('&')[0];
  }

  private updateGuilds(body: string) {
    let gid = parseInt(body.substring(21, 34).split('/')[0]);
    let splitData = body.split('/');
    let guildName = splitData[491].split('&')[3].substring(17);

    if (this.capturedGuilds.find(v => v.gid == gid))
      return;

    this.capturedGuilds.push({ gid: gid, guildName: guildName });
    this.capturedGuilds.sort((a, b) => this.sortFunction(a.gid, b.gid));
  }

  private sortFunction(a: number, b: number) {
    if (a > b)
      return 1;
    if (b > a)
      return -1;

    return 0;
  }
}
