import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { JwtData, LoginWithTotpRequest } from 'src/app/commons/dto/account';
import { LoginWithEmailRequest, LoginWithSmsRequest } from 'src/app/commons/dto/sms-auth';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
})
export class VerifyOtpComponent {

  jwtData: JwtData = new JwtData();

  typeActive: string = "";
  loginWithTotpReq: LoginWithTotpRequest = new LoginWithTotpRequest();
  loginWithSmsReq: LoginWithSmsRequest = new LoginWithSmsRequest();
  loginWithEmailReq: LoginWithEmailRequest = new LoginWithEmailRequest();

  activeCode: string = "";
  validateForm!: UntypedFormGroup;
  isSpinning: boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    private accountService: AccountService,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const url = this.router.url.split('/');
    this.typeActive = url[url.length - 1];

    this.loginWithTotpReq.username = sessionStorage.getItem('username') || "";
    this.loginWithEmailReq.email = sessionStorage.getItem('email') || "";

    this.validateForm = this.fb.group({
      activeCode: [null, [Validators.required]],
    });
  }

  activeEmailCodeWhenRegister(): void {
    this.accountService.activeEmailCode(this.activeCode).subscribe(response => {
      this.notification.create(
        'success',
        'Thông báo',
        'Đăng ký thành công'
      );
      this.isSpinning = false;
      this.router.navigate(['/login']);
    }, error => {
      this.isSpinning = false;
      this.notification.create(
        'error',
        'Lỗi xác thực',
        'Mã xác thực không chính xác. Vui lòng thử lại'
      );
    });
  }

  activeEmailCode(): void {
    this.accountService.activeEmailAuthenticate(this.loginWithEmailReq).subscribe(response => {
      this.jwtData = response.data;

      sessionStorage.removeItem('jwtToken');
      sessionStorage.setItem('jwtToken', this.jwtData.token);
      sessionStorage.setItem('username', this.jwtData.username);
      sessionStorage.setItem('role', this.jwtData.role);
      sessionStorage.removeItem('token');

      this.isSpinning = false;

      this.notification.create(
        'success',
        'Thông báo',
        'Đăng nhập thành công'
      );

      if ("ADMIN" == this.jwtData.role) {
        this.router.navigate(['/admin']);
        setTimeout(() => location.reload(), 800);
      }

    }, error => {
      this.isSpinning = false;
      this.notification.create(
        'error',
        'Lỗi xác thực',
        'Mã xác thực không chính xác. Vui lòng thử lại'
      );
    });
  }

  activeTotpCode(): void {
    this.accountService.activeTotpCode(this.loginWithTotpReq).subscribe(response => {
      this.jwtData = response.data;

      sessionStorage.removeItem('jwtToken');
      sessionStorage.setItem('jwtToken', this.jwtData.token);
      sessionStorage.setItem('username', this.jwtData.username);
      sessionStorage.setItem('role', this.jwtData.role);
      sessionStorage.removeItem('token');

      this.isSpinning = false;

      this.notification.create(
        'success',
        'Thông báo',
        'Đăng nhập thành công'
      );

      if ("ADMIN" == this.jwtData.role) {
        this.router.navigate(['/admin']);
        setTimeout(() => location.reload(), 800);
        
      }

    }, error => {
      this.isSpinning = false;
      this.notification.create(
        'error',
        'Lỗi xác thực',
        'Mã xác thực không chính xác. Vui lòng thử lại'
      );
    });
  }

  activeSmsCode(): void {
    this.accountService.activeSmsAuthenticate(this.loginWithTotpReq).subscribe(response => {
      this.jwtData = response.data;

      sessionStorage.removeItem('jwtToken');
      sessionStorage.setItem('jwtToken', this.jwtData.token);
      sessionStorage.setItem('username', this.jwtData.username);
      sessionStorage.setItem('role', this.jwtData.role);
      sessionStorage.removeItem('token');

      this.isSpinning = false;

      this.notification.create(
        'success',
        'Thông báo',
        'Đăng nhập thành công'
      );

      if ("ADMIN" == this.jwtData.role) {
        this.router.navigate(['/admin']);
        setTimeout(() => location.reload(), 800);
      }

    }, error => {
      this.isSpinning = false;
      let errKey = error.error.errKey;
      if (errKey == "err.sys.sms-code-expired")
        this.notification.create(
          'error',
          'Lỗi xác thực',
          'Mã xác thực hết hạn. Vui lòng thử lại'
        );
      else {
        this.notification.create(
          'error',
          'Lỗi xác thực',
          'Mã xác thực không chính xác. Vui lòng thử lại'
        );
      }
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      this.isSpinning = true;
      console.log('submit', this.validateForm.value);

      if (this.typeActive == "email-register") {
        this.activeCode = this.validateForm.value.activeCode;
        this.activeEmailCodeWhenRegister();
      } else if (this.typeActive == "email") {
        this.loginWithEmailReq.activeCode = this.validateForm.value.activeCode;
        this.activeEmailCode();
      } else if (this.typeActive == "totp") {
        this.loginWithTotpReq.activeCode = this.validateForm.value.activeCode;
        this.activeTotpCode();
      } else if (this.typeActive == "sms") {
        this.loginWithTotpReq.activeCode = this.validateForm.value.activeCode;
        this.activeSmsCode();
      }

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
