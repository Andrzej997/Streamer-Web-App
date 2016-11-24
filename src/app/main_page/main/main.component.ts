import {Component} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent extends BaseComponent {

  constructor() {
    super();
  }

  public ngOnInit() {
  }

}
