import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EmailSenderRequest } from 'src/app/commons/dto/sms-auth';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-modal-input-email',
  templateUrl: './modal-input-email.component.html',
  styleUrls: ['./modal-input-email.component.scss']
})
export class ModalInputEmailComponent {
  validateForm!: UntypedFormGroup;
  isSpinning: boolean = false;

  emailSenderRequest: EmailSenderRequest = new EmailSenderRequest();

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private accountService: AccountService,
    private router: Router,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.emailSenderRequest.username = sessionStorage.getItem("username") || "";
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  submitForm(): void {
    console.log('sdfsdfsdf')
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);

      this.emailSenderRequest.email = this.validateForm.value.email;

      console.log(this.emailSenderRequest);

      this.isSpinning = true;
      this.accountService.sendEmailAuthenticate(this.emailSenderRequest).subscribe(response => {
        this.isSpinning = false;
        this.destroyModal();
        sessionStorage.setItem('email', this.emailSenderRequest.email);
        this.router.navigate(['/verify-otp', 'email']);
      }, error => {
        this.isSpinning = false;
        this.notification.create(
          'error',
          'Lỗi xác thực',
          'Email không tồn tại hoặc không chính xác. Vui lòng thử lại'
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
