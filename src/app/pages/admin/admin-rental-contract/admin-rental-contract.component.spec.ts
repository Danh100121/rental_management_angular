import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRentalContractComponent } from './admin-rental-contract.component';

describe('AdminRentalContractComponent', () => {
  let component: AdminRentalContractComponent;
  let fixture: ComponentFixture<AdminRentalContractComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRentalContractComponent]
    });
    fixture = TestBed.createComponent(AdminRentalContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
