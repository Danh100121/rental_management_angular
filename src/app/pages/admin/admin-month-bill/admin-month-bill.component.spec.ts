import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMonthBillComponent } from './admin-month-bill.component';

describe('AdminMonthBillComponent', () => {
  let component: AdminMonthBillComponent;
  let fixture: ComponentFixture<AdminMonthBillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminMonthBillComponent]
    });
    fixture = TestBed.createComponent(AdminMonthBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
