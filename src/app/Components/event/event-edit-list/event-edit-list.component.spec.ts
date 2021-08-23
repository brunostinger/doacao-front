import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventEditListComponent } from './event-edit-list.component';

describe('EventEditListComponent', () => {
  let component: EventEditListComponent;
  let fixture: ComponentFixture<EventEditListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventEditListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventEditListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
