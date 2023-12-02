import { Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientRequest } from 'src/app/commons/dto/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-modal-admin-update-client',
  templateUrl: './modal-admin-update-client.component.html',
  styleUrls: ['./modal-admin-update-client.component.scss']
})
export class ModalAdminUpdateClientComponent {

  @Input() clientId!: number;

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
    this.getClientById();
  }

  getClientById(): void {
    this.clientService.getClientById(this.clientId).subscribe(response => {
      let data = response.data;

      this.validateForm = this.fb.group({
        fullName: [data.fullName, [Validators.required]],
        idCard: [data.idCard, [Validators.required]],
        address: [data.address, [Validators.required]],
        phoneNumber: [data.phoneNumber, [Validators.required]],
        email: [data.email, [Validators.required]],
        note: [data.note, [Validators.required]]
      });
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  updateClient(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);

      this.clientRequest = {
        fullName: this.validateForm.value.fullName,
        phoneNumber: this.validateForm.value.phoneNumber,
        email: this.validateForm.value.email,
        address: this.validateForm.value.address,
        idCard: this.validateForm.value.idCard,
        note: this.validateForm.value.note,
        clientStatus: undefined,
      }

      console.log(this.clientRequest)
      this.clientService.updateClient(this.clientId, this.clientRequest).subscribe(response => {
        this.destroyModal();

        this.notification.create(
          'success',
          'Thông báo',
          'Cập nhật thông tin khách hàng thành công'
        );
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
