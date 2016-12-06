export class SearchCriteriaDTO {

  public _textSearched: string;
  public _criteria: string;

  constructor() {

  }

  public get textSearched(): string {
    return this._textSearched;
  }

  public set textSearched(value: string) {
    this._textSearched = value;
  }

  public get criteria(): string {
    return this._criteria;
  }

  public set criteria(value: string) {
    this._criteria = value;
  }

  public static fromJSON(json: string): SearchCriteriaDTO {
    let result: SearchCriteriaDTO = new SearchCriteriaDTO();
    let object = JSON.parse(json);
    result._criteria = object._criteria;
    result._textSearched = object._textSearched;
    return result;
  }

}
