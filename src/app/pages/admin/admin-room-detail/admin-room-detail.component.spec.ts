import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoomDetailComponent } from './admin-room-detail.component';

describe('AdminRoomDetailComponent', () => {
  let component: AdminRoomDetailComponent;
  let fixture: ComponentFixture<AdminRoomDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRoomDetailComponent]
    });
    fixture = TestBed.createComponent(AdminRoomDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
