import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ServiceRequest } from 'src/app/commons/dto/services';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-modal-admin-create-service',
  templateUrl: './modal-admin-create-service.component.html',
  styleUrls: ['./modal-admin-create-service.component.scss']
})
export class ModalAdminCreateServiceComponent {
  validateForm!: UntypedFormGroup;
  serviceRequest: ServiceRequest = new ServiceRequest();

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private serviceService: ServicesService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null]
    });
  }

  createService(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);

      this.serviceRequest = {
        name: this.validateForm.value.name,
        price: this.validateForm.value.price,
        description: this.validateForm.value.description
      }

      this.serviceService.createService(this.serviceRequest).subscribe(response => {
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
