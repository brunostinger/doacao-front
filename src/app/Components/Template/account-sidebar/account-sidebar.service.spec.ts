import { TestBed } from '@angular/core/testing';

import { AccountSidebarService } from './account-sidebar.service';

describe('AccountSidebarService', () => {
  let service: AccountSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
