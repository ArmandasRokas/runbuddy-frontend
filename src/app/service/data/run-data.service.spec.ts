import { TestBed } from '@angular/core/testing';

import { RunDataService } from './run-data.service';

describe('RunDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RunDataService = TestBed.get(RunDataService);
    expect(service).toBeTruthy();
  });
});
