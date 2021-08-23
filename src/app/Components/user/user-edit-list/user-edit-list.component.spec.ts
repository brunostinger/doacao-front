import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditListComponent } from './user-edit-list.component';

describe('UserEditListComponent', () => {
  let component: UserEditListComponent;
  let fixture: ComponentFixture<UserEditListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
