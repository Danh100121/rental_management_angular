import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientStatus } from 'src/app/commons/constants/status';
import { ClientRequest } from 'src/app/commons/dto/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-modal-admin-create-client',
  templateUrl: './modal-admin-create-client.component.html',
  styleUrls: ['./modal-admin-create-client.component.scss']
})
export class ModalAdminCreateClientComponent {

  validateForm!: UntypedFormGroup;
  clientRequest: ClientRequest = new ClientRequest();

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private clientService: ClientService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      fullName: [null, [Validators.required]],
      idCard: [null, [Validators.required]],
      address: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      email: [null, [Validators.required]],
      note: [null, [Validators.required]]
    });
  }

  createClient(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);

      this.clientRequest = {
        fullName: this.validateForm.value.fullName,
        phoneNumber: this.validateForm.value.phoneNumber,
        email: this.validateForm.value.email,
        address: this.validateForm.value.address,
        idCard: this.validateForm.value.idCard,
        note: this.validateForm.value.note,
        clientStatus: ClientStatus.AVAILABLE,
      }

      console.log(this.clientRequest)
      this.clientService.createClient(this.clientRequest).subscribe(response => {
        this.destroyModal();
      }, error => {
        this.notification.create(
          'error',
          'Lỗi máy chủ',
          'Có lỗi xảy ra vui lòng thử lại sau'
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

  destroyModal(): void {
    this.modal.close();
  }

}
