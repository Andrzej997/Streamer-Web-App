import {Component} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';

@Component({
  selector: 'app-contact-view',
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.css']
})
export class ContactViewComponent extends BaseComponent {

  constructor() {
    super();
  }

}
