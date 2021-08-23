import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationHomeComponent } from './donation-home.component';

describe('DonationHomeComponent', () => {
  let component: DonationHomeComponent;
  let fixture: ComponentFixture<DonationHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonationHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
