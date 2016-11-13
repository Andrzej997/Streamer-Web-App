/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {EbookService} from './ebook.service';

describe('Service: Ebook', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EbookService]
    });
  });

  it('should ...', inject([EbookService], (service: EbookService) => {
    expect(service).toBeTruthy();
  }));
});
