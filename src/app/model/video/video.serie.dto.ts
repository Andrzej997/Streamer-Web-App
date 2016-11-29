export class VideoSerieDTO {

  public _videoSerieId: number;
  public _title: string;
  public _number: number;
  public _comments: string;
  public _year: Date;

  constructor() {
  }

  get videoSerieId(): number {
    return this._videoSerieId;
  }

  set videoSerieId(value: number) {
    this._videoSerieId = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get number(): number {
    return this._number;
  }

  set number(value: number) {
    this._number = value;
  }

  get comments(): string {
    return this._comments;
  }

  set comments(value: string) {
    this._comments = value;
  }

  get year(): Date {
    return this._year;
  }

  set year(value: Date) {
    this._year = value;
  }
}
