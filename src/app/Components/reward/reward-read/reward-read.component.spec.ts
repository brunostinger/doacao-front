import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardReadComponent } from './reward-read.component';

describe('RewardReadComponent', () => {
  let component: RewardReadComponent;
  let fixture: ComponentFixture<RewardReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
