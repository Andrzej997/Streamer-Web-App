import {Component} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';

@Component({
  selector: 'app-help-view',
  templateUrl: './help-view.component.html',
  styleUrls: ['./help-view.component.css']
})
export class HelpViewComponent extends BaseComponent {

  constructor() {
    super();
  }

}
