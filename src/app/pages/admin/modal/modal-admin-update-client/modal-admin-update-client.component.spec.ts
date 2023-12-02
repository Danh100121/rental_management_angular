import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAdminUpdateClientComponent } from './modal-admin-update-client.component';

describe('ModalAdminUpdateClientComponent', () => {
  let component: ModalAdminUpdateClientComponent;
  let fixture: ComponentFixture<ModalAdminUpdateClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAdminUpdateClientComponent]
    });
    fixture = TestBed.createComponent(ModalAdminUpdateClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
