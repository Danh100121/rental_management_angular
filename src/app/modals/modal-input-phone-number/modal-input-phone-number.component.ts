import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SmsSenderRequest } from 'src/app/commons/dto/sms-auth';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-modal-input-phone-number',
  templateUrl: './modal-input-phone-number.component.html',
  styleUrls: ['./modal-input-phone-number.component.scss']
})
export class ModalInputPhoneNumberComponent {
  validateForm!: UntypedFormGroup;
  isSpinning: boolean = false;

  smsSenderRequest: SmsSenderRequest = new SmsSenderRequest();

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private accountService: AccountService,    
    private router: Router,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      phoneNumber: [null, [Validators.required]],
      phoneNumberPrefix: ['+84', [Validators.required]],
    });
  }

  submitForm(): void {
    console.log('sdfsdfsdf')
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);

      this.smsSenderRequest.phoneNumber = this.validateForm.value.phoneNumberPrefix +
        this.validateForm.value.phoneNumber;
      this.smsSenderRequest.username = sessionStorage.getItem('username') || "";

      console.log(this.smsSenderRequest);

      this.isSpinning = true;
      this.accountService.sendSmsAuthenticate(this.smsSenderRequest).subscribe(response => {
        this.isSpinning = false;
        this.destroyModal();
        this.router.navigate(['/verify-otp', 'sms']);
      }, error => {
        this.isSpinning = false;
        this.notification.create(
          'error',
          'Lỗi xác thực',
          'Số điện thoại sai định dạng hoặc không tồn tại. Vui lòng thử lại'
        );
      });

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
