import { TestBed } from '@angular/core/testing';

import { ResInterceptorsService } from './res-interceptors.service';

describe('ResInterceptorsService', () => {
  let service: ResInterceptorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResInterceptorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
