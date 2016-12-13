export class RegistrationDTO {
  public _username: string;
  public _password: string;
  public _email: string;

  constructor(username: string, password: string, email: string) {
    this._username = username;
    this._password = password;
    this._email = email;
  }


  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }
}
