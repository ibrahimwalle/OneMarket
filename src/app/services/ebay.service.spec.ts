import { TestBed } from '@angular/core/testing';

import { EbayService } from './ebay.service';

describe('EbayService', () => {
  let service: EbayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EbayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
