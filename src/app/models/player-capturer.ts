export class PlayerCapturer {

  id: number = Date.now();
  minPid!: number;
  maxPid!: number;
  name: string;
  playerName: string = '-';
  pid: number | string = '-';
  guildJoined: string = '-';
  timestamp: number = Date.now();

  constructor(minPid: number, maxPid: number, capturerIdentifier?: string) {
    this.setConfiguration(minPid, maxPid);
    this.name = capturerIdentifier ? capturerIdentifier : '';
  }

  public setConfiguration(minPid: number, maxPid: number) {
    if (minPid > maxPid)
      throw new Error("Minimum player id can't be higher than maximum player id");

    this.minPid = minPid;
    this.maxPid = maxPid;    
  }

  public isPlayerValid(pid: number): boolean {
    return pid <= this.maxPid && pid >= this.minPid;
  }

  public digestPlayer(pid: number, timestamp: number, name: string) {
    if (this.timestamp < timestamp)
      return;

    this.timestamp = timestamp;
    this.playerName = name;
    this.pid = pid;
    this.guildJoined = new Date(timestamp * 1000).toDateString();
  }
  public reset() {
    this.playerName = '-';
    this.pid = '-';
    this.guildJoined = '-';
    this.timestamp = Date.now();
  }

}
