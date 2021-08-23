import { TestBed } from '@angular/core/testing';

import { AccountSubheaderService } from './account-subheader.service';

describe('AccountSubheaderService', () => {
  let service: AccountSubheaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountSubheaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
