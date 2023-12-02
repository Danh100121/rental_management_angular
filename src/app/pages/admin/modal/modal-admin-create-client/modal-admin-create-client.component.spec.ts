import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminCreateClientComponent } from './modal-admin-create-client.component';

describe('ModalAdminCreateClientComponent', () => {
  let component: ModalAdminCreateClientComponent;
  let fixture: ComponentFixture<ModalAdminCreateClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAdminCreateClientComponent]
    });
    fixture = TestBed.createComponent(ModalAdminCreateClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
