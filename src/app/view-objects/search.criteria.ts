import {SearchCriteriaDTO} from "../model/search.criteria.dto";

export class SearchCriteria extends SearchCriteriaDTO {

  private _endpoint: String;

  constructor() {
    super();
  }

  get endpoint(): String {
    return this._endpoint;
  }

  set endpoint(value: String) {
    this._endpoint = value;
  }
}
