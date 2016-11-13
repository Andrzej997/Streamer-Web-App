import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AbstractService} from '../abstract-service/abstract.service';

@Injectable()
export class VideoService extends AbstractService {

  constructor(protected http: Http) {
    super(http);
  }

}
