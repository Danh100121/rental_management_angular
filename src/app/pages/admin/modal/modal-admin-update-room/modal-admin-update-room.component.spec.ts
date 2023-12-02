import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminUpdateRoomComponent } from './modal-admin-update-room.component';

describe('ModalAdminUpdateRoomComponent', () => {
  let component: ModalAdminUpdateRoomComponent;
  let fixture: ComponentFixture<ModalAdminUpdateRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAdminUpdateRoomComponent]
    });
    fixture = TestBed.createComponent(ModalAdminUpdateRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
