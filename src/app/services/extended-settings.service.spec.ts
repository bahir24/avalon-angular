import { TestBed } from '@angular/core/testing';

import { ExtendedSettingsService } from './extended-settings.service';

describe('ExtendedSettingsService', () => {
  let service: ExtendedSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtendedSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
