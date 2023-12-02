import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalInputEmailComponent } from './modal-input-email.component';

describe('ModalInputEmailComponent', () => {
  let component: ModalInputEmailComponent;
  let fixture: ComponentFixture<ModalInputEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalInputEmailComponent]
    });
    fixture = TestBed.createComponent(ModalInputEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
