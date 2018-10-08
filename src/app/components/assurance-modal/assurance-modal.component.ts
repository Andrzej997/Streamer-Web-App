import {Component, Input, Output, EventEmitter, ViewChild, SimpleChanges} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-assurance-modal',
  templateUrl: './assurance-modal.component.html',
  styleUrls: ['./assurance-modal.component.css']
})
export class AssuranceModalComponent extends BaseComponent {

  @Input() public inputText: string;
  @Output() public close = new EventEmitter<boolean>();
  private displayedText: string;

  @ViewChild('deleteValidationModal')
  public deleteValidationModal: ModalDirective;

  constructor() {
    super();
  }

  public ngOnInit() {
    if (this.inputText != null && this.inputText.length <= 0) {
      this.displayedText = this.inputText;
    } else {
      this.displayedText = 'Are you sure ?'
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    let change = changes['inputText'];
    if (change == null) {
      return;
    }
    if (change.currentValue === change.previousValue) {
      return;
    }
    let text: string = <string>change.currentValue;
    if (text == null || text.length <= 0) {
      this.displayedText = text;
    } else {
      this.displayedText = 'Are you sure ?'
    }
  }

  public show(): void {
    this.deleteValidationModal.show();
  }

  public onHide(value: boolean): void {
    this.close.emit(value);
    this.deleteValidationModal.hide();
  }

}
