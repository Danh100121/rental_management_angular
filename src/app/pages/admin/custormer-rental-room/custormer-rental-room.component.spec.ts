import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRentalRoomComponent } from './custormer-rental-room.component';

describe('CustormerRentalRoomComponent', () => {
  let component: CustomerRentalRoomComponent;
  let fixture: ComponentFixture<CustomerRentalRoomComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerRentalRoomComponent]
    });
    fixture = TestBed.createComponent(CustomerRentalRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
