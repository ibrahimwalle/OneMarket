import { TestBed } from '@angular/core/testing';

import { FstoreService } from './fstore.service';

describe('FstoreService', () => {
  let service: FstoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FstoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
