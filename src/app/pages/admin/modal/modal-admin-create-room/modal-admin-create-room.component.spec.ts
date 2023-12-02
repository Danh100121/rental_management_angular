import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminCreateRoomComponent } from './modal-admin-create-room.component';

describe('ModalAdminCreateRoomComponent', () => {
  let component: ModalAdminCreateRoomComponent;
  let fixture: ComponentFixture<ModalAdminCreateRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAdminCreateRoomComponent]
    });
    fixture = TestBed.createComponent(ModalAdminCreateRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
