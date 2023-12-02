import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ModalCreateTotpComponent } from 'src/app/modals/modal-create-totp/modal-create-totp.component';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-security-info',
  templateUrl: './security-info.component.html',
  styleUrls: ['./security-info.component.scss']
})
export class SecurityInfoComponent {

  constructor(
    private fb: UntypedFormBuilder,
    private accountService: AccountService,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  showModalCreateTotp(): void {
    const modal = this.modalService.create({
      nzTitle: 'Đăng ký xác thực',
      nzContent: ModalCreateTotpComponent,
      nzWidth: 750
    });
  }
}
