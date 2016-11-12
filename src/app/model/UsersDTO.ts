export class UsersDTO {
  private _userId: number;
  private _userName: String;
  private _email: String;
  private _name: String;
  private _surname: String;
  private _nationality: String;


  constructor() {
  }


  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }

  get userName(): String {
    return this._userName;
  }

  set userName(value: String) {
    this._userName = value;
  }

  get email(): String {
    return this._email;
  }

  set email(value: String) {
    this._email = value;
  }

  get name(): String {
    return this._name;
  }

  set name(value: String) {
    this._name = value;
  }

  get surname(): String {
    return this._surname;
  }

  set surname(value: String) {
    this._surname = value;
  }

  get nationality(): String {
    return this._nationality;
  }

  set nationality(value: String) {
    this._nationality = value;
  }
}
