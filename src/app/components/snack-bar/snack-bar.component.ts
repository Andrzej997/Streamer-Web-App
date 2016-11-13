import {Component, Input} from '@angular/core';
import {BaseComponent} from "../../base-component/base-component";

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent extends BaseComponent {

  private _message: string;
  private _visible: boolean;
  private _timeout: number;

  constructor() {
    super();
  }

  ngOnInit() {
    this.message = '';
    this.visible = true;
  }

  public showSnackMessage() {
    if (!this.visible) {
      return;
    }
    var snack = document.getElementById('snackbar');
    snack.className = 'show';
    setTimeout(function () {
      snack.className = snack.className.replace("show", "");
    }, this.timeout);
  }

  get message(): string {
    return this._message;
  }

  @Input()
  set message(value: string) {
    this._message = value;
  }


  get visible(): boolean {
    return this._visible;
  }

  @Input()
  set visible(value: boolean) {
    this._visible = value;
  }

  get timeout(): number {
    return this._timeout;
  }

  @Input()
  set timeout(value: number) {
    this._timeout = value;
  }
}
