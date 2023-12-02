import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-modal-create-totp',
  templateUrl: './modal-create-totp.component.html',
  styleUrls: ['./modal-create-totp.component.scss']
})
export class ModalCreateTotpComponent {

  secretCode: string = "";
  qrString: string = "";

  activeCode: string = "";
  validateForm!: UntypedFormGroup;
  isSpinning: boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    private accountService: AccountService,
    private notification: NzNotificationService,
    private modal: NzModalRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registerTotp();
    this.validateForm = this.fb.group({
      activeCode: [null, [Validators.required]],
    });
  }

  registerTotp(): void {
    this.accountService.registerTotp().subscribe(response => {
      this.secretCode = response.message;
      console.log(this.secretCode);
      this.qrString = "otpauth://totp/Example:alice@google.com?secret=" + this.secretCode + "&issuer=Example";
    }, error => {
      this.isSpinning = false;
      this.notification.create(
        'error',
        'Lỗi xác thực',
        'Mã xác thực không chính xác. Vui lòng thử lại'
      );
      this.destroyModal();
    })
  }

  activateTotpCode(): void {
    this.accountService.registerTotpCode(this.activeCode).subscribe(response => {
      this.notification.create(
        'success',
        'Thông báo',
        'Đăng ký thành công'
      );
      this.isSpinning = false;
      this.destroyModal();
    }, error => {
      this.isSpinning = false;
      this.notification.create(
        'error',
        'Lỗi xác thực',
        'Mã xác thực không chính xác. Vui lòng thử lại'
      );
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.isSpinning = true;
      console.log('submit', this.validateForm.value);
      this.activeCode = this.validateForm.value.activeCode;
      this.activateTotpCode();
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  destroyModal(): void {
    this.modal.close();
  }
}
