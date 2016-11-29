export class DirectorDTO {

  public _directorId: number;
  public _name: string;
  public _name2: string;
  public _surname: string;
  public _birthDate: Date;
  public _deathDate: Date;
  public _comments: string;
  public _ratings: number;

  constructor() {

  }

  get directorId(): number {
    return this._directorId;
  }

  set directorId(value: number) {
    this._directorId = value;
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

  get birthDate(): Date {
    return this._birthDate;
  }

  set birthDate(value: Date) {
    this._birthDate = value;
  }

  get deathDate(): Date {
    return this._deathDate;
  }

  set deathDate(value: Date) {
    this._deathDate = value;
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
