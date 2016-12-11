export class RateImageDTO {
  public _imageId: number;
  public _rate: number;

  constructor() {

  }

  public get imageId(): number {
    return this._imageId;
  }

  public set imageId(value: number) {
    this._imageId = value;
  }

  public get rate(): number {
    return this._rate;
  }

  public set rate(value: number) {
    this._rate = value;
  }
}
