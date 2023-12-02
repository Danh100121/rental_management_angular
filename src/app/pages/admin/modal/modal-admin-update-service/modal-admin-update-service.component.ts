import { Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ServiceRequest } from 'src/app/commons/dto/services';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-modal-admin-update-service',
  templateUrl: './modal-admin-update-service.component.html',
  styleUrls: ['./modal-admin-update-service.component.scss']
})
export class ModalAdminUpdateServiceComponent {
  @Input() serviceId!: number;

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
    this.getServiceById();
  }

  getServiceById(): void {
    this.serviceService.getServiceById(this.serviceId).subscribe(response => {
      let data = response.data;

      this.validateForm = this.fb.group({
        name: [data.name, [Validators.required]],
        price: [data.price, [Validators.required]],
        description: [data.description]
      });
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  updateService(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);

      this.serviceRequest = {
        name: this.validateForm.value.name,
        price: this.validateForm.value.price,
        description: this.validateForm.value.description
      }

      this.serviceService.updateService(this.serviceId, this.serviceRequest).subscribe(response => {
        this.destroyModal();

        this.notification.create(
          'success',
          'Thông báo',
          'Cập nhật thông tin dịch vụ thành công'
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
