import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSubheaderComponent } from './account-subheader.component';

describe('AccountSubheaderComponent', () => {
  let component: AccountSubheaderComponent;
  let fixture: ComponentFixture<AccountSubheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountSubheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSubheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
