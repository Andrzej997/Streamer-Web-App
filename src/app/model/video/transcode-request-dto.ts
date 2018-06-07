export class TranscodeRequestDTO {

  private _videoId: Number;
  private _resolutionType: String;
  private _username: String;

  constructor() {
  }

  get videoId(): Number {
    return this._videoId;
  }

  set videoId(value: Number) {
    this._videoId = value;
  }

  get resolutionType(): String {
    return this._resolutionType;
  }

  set resolutionType(value: String) {
    this._resolutionType = value;
  }

  get username(): String {
    return this._username;
  }

  set username(value: String) {
    this._username = value;
  }
}
