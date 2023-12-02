import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticateOptionsComponent } from './authenticate-options.component';

describe('AuthenticateOptionsComponent', () => {
  let component: AuthenticateOptionsComponent;
  let fixture: ComponentFixture<AuthenticateOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticateOptionsComponent]
    });
    fixture = TestBed.createComponent(AuthenticateOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
