export class RateEbookDTO {
  public _ebookId: number;
  public _rate: number;

  constructor() {

  }

  public get ebookId(): number {
    return this._ebookId;
  }

  public set ebookId(value: number) {
    this._ebookId = value;
  }

  public get rate(): number {
    return this._rate;
  }

  public set rate(value: number) {
    this._rate = value;
  }

}
