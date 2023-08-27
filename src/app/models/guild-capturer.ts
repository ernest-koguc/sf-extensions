import { Guild } from "./guild";

export class GuildCapturer {

  id: number = Date.now();
  name: string;
  maxGid!: number;
  minGid!: number;
  guilds: Guild[] = [];

  constructor(minGid: number, maxGid: number, capturerIdentifier: string) {
    this.setConfiguration(minGid, maxGid);
    this.name = capturerIdentifier;
  }
  
  public setConfiguration(minGid: number, maxGid: number) {
    if (minGid > maxGid)
      throw new Error('Minimum gid cant be greater than maximum gid');
    this.minGid = minGid;
    this.maxGid = maxGid;
  }

  public digestGuild(gid: number, name: string) {
    if (this.guilds.find(g => g.gid == gid))
      return;

    if (gid > this.maxGid || gid < this.minGid)
      return;

    let guild: Guild = { gid: gid, guildName: name };
    this.guilds.push(guild);
    this.guilds.sort((a, b) => this.sortFunction(a.gid, b.gid));
  }

  private sortFunction(a: number, b: number) {
    if (a > b)
      return 1;
    if (b > a)
      return -1;

    return 0;
  }
}
