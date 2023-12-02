import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminUpdateServiceComponent } from './modal-admin-update-service.component';

describe('ModalAdminUpdateServiceComponent', () => {
  let component: ModalAdminUpdateServiceComponent;
  let fixture: ComponentFixture<ModalAdminUpdateServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAdminUpdateServiceComponent]
    });
    fixture = TestBed.createComponent(ModalAdminUpdateServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
