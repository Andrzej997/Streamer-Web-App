import {Injectable} from '@angular/core';
import {AuthHttp} from 'angular2-jwt';
import {AbstractService} from '../abstract-service/abstract.service';

@Injectable()
export class MusicService extends AbstractService {

  constructor(protected http: AuthHttp) {
    super(http);
  }

}
