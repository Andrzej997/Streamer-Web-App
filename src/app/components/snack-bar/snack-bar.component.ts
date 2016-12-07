import {Component, ViewChild, ElementRef} from "@angular/core";
import {BaseComponent} from "../../base-component/base-component";

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent extends BaseComponent {

  public _message: string;
  public _visible: boolean;
  public _timeout: number;

  @ViewChild('snackBar')
  public el: ElementRef;

  constructor() {
    super();
  }

  ngOnInit() {
    this._visible = true;
  }

  public showSnackMessage() {
    if (!this._visible) {
      return;
    }
    this.el.nativeElement.className = 'show';
    this.el.nativeElement.id = 'snackbarSuccess';
    setTimeout(() => {
      this.el.nativeElement.className = this.el.nativeElement.className.replace('show', '');
    }, this._timeout);
  }

  public showSnackMessageError() {
    if (!this._visible) {
      return;
    }
    this.el.nativeElement.className = 'show';
    this.el.nativeElement.id = 'snackbarError';
    setTimeout(() => {
      this.el.nativeElement.className = this.el.nativeElement.className.replace('show', '');
    }, this._timeout);
  }
}
