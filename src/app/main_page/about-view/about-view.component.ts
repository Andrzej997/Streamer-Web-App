import {Component} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';

@Component({
  selector: 'app-about-view',
  templateUrl: './about-view.component.html',
  styleUrls: ['./about-view.component.css']
})
export class AboutViewComponent extends BaseComponent {

  constructor() {
    super();
  }

}
