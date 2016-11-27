export class FilmGenreDTO {

  private _filmGenreId: number;
  private _name: string;
  private _comments: string;

  constructor() {

  }

  get filmGenreId(): number {
    return this._filmGenreId;
  }

  set filmGenreId(value: number) {
    this._filmGenreId = value;
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
