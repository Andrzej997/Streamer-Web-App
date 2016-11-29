import {Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {AuthHttp} from 'angular2-jwt';

export abstract class AbstractService {
  private _headers: Headers = new Headers({'Content-Type': 'application/json'});
  private _options: RequestOptions = new RequestOptions({headers: this._headers});

  constructor(protected http: AuthHttp) {

  }

  protected performGet(url: string, options?: RequestOptions): Observable<any> {
    return this.http.get(url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  protected performPost(url: string, jsonBody: string, options?: RequestOptions): Observable<any> {
    return this.http.post(url, jsonBody, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  protected performPut(url: string, jsonBody: string, options?: RequestOptions): Observable<any> {
    return this.http.put(url, jsonBody, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  protected performPatch(url: string, jsonBody: string, options?: RequestOptions): Observable<any> {
    return this.http.patch(url, jsonBody, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  protected performDelete(url: string, options?: RequestOptions): Observable<any> {
    return this.http.delete(url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  protected performHead(url: string, options?: RequestOptions): Observable<any> {
    return this.http.head(url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  protected performOptions(url: string, options?: RequestOptions): Observable<any> {
    return this.http.options(url, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  protected extractData(res: Response) {
    //let body: Blob = new Blob([res], {type: 'video/mp4'});
    let body = res.json();
    console.log(body);
    return body.body || body;
  }

  protected handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


  get headers(): Headers {
    return this._headers;
  }

  set headers(value: Headers) {
    this._headers = value;
  }

  get options(): RequestOptions {
    return this._options;
  }

  set options(value: RequestOptions) {
    this._options = value;
  }
}
