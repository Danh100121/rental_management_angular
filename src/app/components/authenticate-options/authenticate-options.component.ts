import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ModalInputEmailComponent } from 'src/app/modals/modal-input-email/modal-input-email.component';
import { ModalInputPhoneNumberComponent } from 'src/app/modals/modal-input-phone-number/modal-input-phone-number.component';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-authenticate-options',
  templateUrl: './authenticate-options.component.html',
  styleUrls: ['./authenticate-options.component.scss']
})
export class AuthenticateOptionsComponent {
  isSpinning: boolean = false;

  constructor(
    private fb: UntypedFormBuilder,
    private accountService: AccountService,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onAuthenticate(option: string): void {
    if (option == 'email') this.showModalInputEmail();
    else if (option == 'sms') this.showModalInputPhoneNumber();
    else if (option == 'totp') {
      let username = sessionStorage.getItem('username') || "";

      this.isSpinning = true;
      this.accountService.checkTotpRegister(username).subscribe(response => {
        this.isSpinning = false;
        let checkFlag = response.data;
        if (checkFlag == false)
          this.notification.create(
            'info',
            'Thông báo',
            'Bạn chưa đăng ký xác thực bằng ứng dụng thứ 3. Vui lòng sử dụng phương thức xác thực khác'
          );
        else this.router.navigate(['/verify-otp', option]);
      }, error => {
        this.isSpinning = false;
        this.notification.create(
          'error',
          'Lỗi đăng nhập',
          'Lỗi hệ thống. Vui lòng thử lại'
        );
      });
    }
  }

  showModalInputPhoneNumber(): void {
    const modal = this.modalService.create({
      nzTitle: 'Nhập số điện thoại',
      nzContent: ModalInputPhoneNumberComponent,
      nzWidth: 350
    });
  }

  showModalInputEmail(): void {
    const modal = this.modalService.create({
      nzTitle: 'Nhập email',
      nzContent: ModalInputEmailComponent,
      nzWidth: 400
    });
  }
}
