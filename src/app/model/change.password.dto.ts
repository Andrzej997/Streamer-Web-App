export class ChangePasswordDTO {

  public _oldPassword: string;
  public _newPassword: string;
  public _username: string;

  constructor() {
  }

  get oldPassword(): string {
    return this._oldPassword;
  }

  set oldPassword(value: string) {
    this._oldPassword = value;
  }

  get newPassword(): string {
    return this._newPassword;
  }

  set newPassword(value: string) {
    this._newPassword = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }
}
