import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInputPhoneNumberComponent } from './modal-input-phone-number.component';

describe('ModalInputPhoneNumberComponent', () => {
  let component: ModalInputPhoneNumberComponent;
  let fixture: ComponentFixture<ModalInputPhoneNumberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalInputPhoneNumberComponent]
    });
    fixture = TestBed.createComponent(ModalInputPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
