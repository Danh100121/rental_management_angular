import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AccountRegister, RoleEnum } from 'src/app/commons/dto/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-modal-register',
  templateUrl: './modal-register.component.html',
  styleUrls: ['./modal-register.component.scss']
})
export class ModalRegisterComponent {
  accountRegister: AccountRegister = new AccountRegister();
  validateForm!: UntypedFormGroup;
  isSpinning: boolean = false;

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private router: Router,
    private authService: AccountService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  destroyModal(): void {
    this.modal.close();
  }

  createAccount(): void {
    if (this.validateForm.valid) {
      this.isSpinning = true;
      console.log('submit', this.validateForm.value);
      this.accountRegister = {
        username: this.validateForm.value.username,
        email: this.validateForm.value.email,
        authority: RoleEnum.ADMIN,
        password: this.validateForm.value.password,
      }
      this.accountRegister.username = this.accountRegister.username.trim();
      this.accountRegister.email = this.accountRegister.email.trim();
      this.accountRegister.password = this.accountRegister.password.trim();

      this.authService.register(this.accountRegister).subscribe(data => {
        console.log(data);
        this.isSpinning = false;
        this.destroyModal();
        this.router.navigate(['/verify-otp', 'email-register'])
      }, error => {
        this.isSpinning = false;
        this.notification.create(
          'error',
          'Lỗi dữ liệu',
          'Username hoặc Email đã tồn tại'
        );
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
