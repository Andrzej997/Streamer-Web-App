import {Component, Input} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent extends BaseComponent {

  @Input() searchText: string = '';
  @Input() type: string;
  @Input() filterType: string;

  constructor(private router: Router) {
    super();
  }

  public ngOnInit(): void {

  }

  public onSubmit() {

  }

}
