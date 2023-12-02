import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMotelRoomComponent } from './admin-motel-room.component';

describe('AdminMotelRoomComponent', () => {
  let component: AdminMotelRoomComponent;
  let fixture: ComponentFixture<AdminMotelRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMotelRoomComponent]
    });
    fixture = TestBed.createComponent(AdminMotelRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
