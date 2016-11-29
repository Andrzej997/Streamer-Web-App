export class MusicGenreDTO {

  public _musicGenreId: number;
  public _name: string;
  public _comments: string;

  constructor() {
  }

  get musicGenreId(): number {
    return this._musicGenreId;
  }

  set musicGenreId(value: number) {
    this._musicGenreId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get comments(): string {
    return this._comments;
  }

  set comments(value: string) {
    this._comments = value;
  }
}
