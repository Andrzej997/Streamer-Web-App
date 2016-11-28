export class ArtistDTO {
  private _artistId: number;
  private _name: string;
  private _name2: string;
  private _surname: string;
  private _birthYear: Date;
  private _deathYear: Date;
  private _comments: string;
  private _ratings: number;

  constructor() {

  }

  get artistId(): number {
    return this._artistId;
  }

  set artistId(value: number) {
    this._artistId = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get name2(): string {
    return this._name2;
  }

  set name2(value: string) {
    this._name2 = value;
  }

  get surname(): string {
    return this._surname;
  }

  set surname(value: string) {
    this._surname = value;
  }

  get birthYear(): Date {
    return this._birthYear;
  }

  set birthYear(value: Date) {
    this._birthYear = value;
  }

  get deathYear(): Date {
    return this._deathYear;
  }

  set deathYear(value: Date) {
    this._deathYear = value;
  }

  get comments(): string {
    return this._comments;
  }

  set comments(value: string) {
    this._comments = value;
  }

  get ratings(): number {
    return this._ratings;
  }

  set ratings(value: number) {
    this._ratings = value;
  }
}
