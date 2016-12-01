import {Component, Input, EventEmitter, Output} from '@angular/core';
import {BaseComponent} from '../../base-component/base-component';
import {Router} from '@angular/router';
import {SearchCriteria} from "../../view-objects/search.criteria";

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.css']
})
export class SearchComponentComponent extends BaseComponent {

  @Input() searchText: string = '';
  @Input() type: string;
  @Input() filterType: string;
  @Output() search: EventEmitter<SearchCriteria>;

  constructor(private router: Router) {
    super();
    this.search = new EventEmitter<SearchCriteria>();
  }

  public onSubmit() {
    let searchCriteria: SearchCriteria = new SearchCriteria();
    searchCriteria.criteria = this.filterType;
    searchCriteria.textSearched = this.searchText;
    searchCriteria.endpoint = this.type;
    this.search.emit(searchCriteria);
  }

}
