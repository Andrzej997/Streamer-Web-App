import {SearchCriteriaDTO} from '../model/search.criteria.dto';

export class SearchCriteria extends SearchCriteriaDTO {

  private _endpoint: String;

  public static fromJSON(json: string): SearchCriteria {
    let result: SearchCriteria = new SearchCriteria();
    let object = JSON.parse(json);
    result._criteria = object._criteria;
    result._textSearched = object._textSearched;
    result._endpoint = object._endpoint;
    return result;
  }

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
