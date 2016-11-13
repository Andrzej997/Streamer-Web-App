import {Component} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent extends BaseComponent {

  constructor() {
    super();
  }

}
