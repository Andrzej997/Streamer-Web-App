export class RateSongDTO {
  public _songId: number;
  public _rate: number;

  constructor() {

  }

  public get songId(): number {
    return this._songId;
  }

  public set songId(value: number) {
    this._songId = value;
  }

  public get rate(): number {
    return this._rate;
  }

  public set rate(value: number) {
    this._rate = value;
  }
}
