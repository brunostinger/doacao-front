import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationAreaComponent } from './occupation-area.component';

describe('OccupationAreaComponent', () => {
  let component: OccupationAreaComponent;
  let fixture: ComponentFixture<OccupationAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OccupationAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OccupationAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
