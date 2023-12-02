import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminCreateServiceComponent } from './modal-admin-create-service.component';

describe('ModalAdminCreateServiceComponent', () => {
  let component: ModalAdminCreateServiceComponent;
  let fixture: ComponentFixture<ModalAdminCreateServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAdminCreateServiceComponent]
    });
    fixture = TestBed.createComponent(ModalAdminCreateServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
