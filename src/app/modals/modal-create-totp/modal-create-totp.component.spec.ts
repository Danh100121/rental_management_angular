import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateTotpComponent } from './modal-create-totp.component';

describe('ModalCreateTotpComponent', () => {
  let component: ModalCreateTotpComponent;
  let fixture: ComponentFixture<ModalCreateTotpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCreateTotpComponent]
    });
    fixture = TestBed.createComponent(ModalCreateTotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
