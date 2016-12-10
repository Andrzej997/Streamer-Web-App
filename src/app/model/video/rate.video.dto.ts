export class RateVideoDTO {
  public _filmId: number;
  public _rate: number;

  constructor() {

  }

  public get filmId(): number {
    return this._filmId;
  }

  public set filmId(value: number) {
    this._filmId = value;
  }

  public get rate(): number {
    return this._rate;
  }

  public set rate(value: number) {
    this._rate = value;
  }
}
