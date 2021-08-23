import { TestBed } from '@angular/core/testing';

import { OccupationAreaService } from './occupation-area.service';

describe('OccupationAreaService', () => {
  let service: OccupationAreaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OccupationAreaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
