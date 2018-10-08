export class VideoQualityDto {

  public _videoFileId: number;
  public _resolution: string;

  constructor() {
  }

  get videoFileId(): number {
    return this._videoFileId;
  }

  set videoFileId(value: number) {
    this._videoFileId = value;
  }

  get resolution(): string {
    return this._resolution;
  }

  set resolution(value: string) {
    this._resolution = value;
  }
}
