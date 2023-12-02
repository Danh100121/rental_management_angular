import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ServiceDto } from 'src/app/commons/dto/services';
import { ServicesService } from 'src/app/services/services.service';
import { ModalAdminCreateServiceComponent } from '../modal/modal-admin-create-service/modal-admin-create-service.component';
import { ModalAdminUpdateServiceComponent } from '../modal/modal-admin-update-service/modal-admin-update-service.component';

@Component({
  selector: 'app-admin-service-list',
  templateUrl: './admin-service-list.component.html',
  styleUrls: ['./admin-service-list.component.scss']
})
export class AdminServiceListComponent {

  constructor(
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private servicesService: ServicesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllServices();
  }

  listOfDisplayData: ServiceDto[] = [];

  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  getAllServices(): void {
    this.servicesService.getAllService().subscribe(response => {
      this.listOfDisplayData = response.data;
      this.loading = false;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi server',
        'Lỗi truyền tải dữ liệu'
      );
    });
  }

  showModalCreateService(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới dịch vụ',
      nzContent: ModalAdminCreateServiceComponent,
      nzWidth: 750,
    });
    modal.afterClose.subscribe(() => this.getAllServices())
  }

  showModalUpdateService(serviceId: number): void {
    const modal = this.modalService.create({
      nzTitle: 'Câp nhât thông tin dịch vụ',
      nzContent: ModalAdminUpdateServiceComponent,
      nzWidth: 750,
    });
    modal.componentInstance!.serviceId = serviceId;
    modal.afterClose.subscribe(() => this.getAllServices())
  }

  onDeleteService(serviceId: number): void {
    this.modalService.confirm({
      nzTitle: '<i>Xác nhận</i>',
      nzContent: '<b>Bạn có chắc muốn xóa dữ liệu dịch vụ #' + serviceId + '?</b>',
      nzOnOk: () => this.servicesService.deleteService(serviceId).subscribe(response => {
        this.notification.create(
          'success',
          'Thông báo',
          'Xóa dữ liệu dịch vụ thành công!!'
        );
        this.getAllServices();
      }, error => {
        this.notification.create(
          'error',
          'Lỗi server',
          'Lỗi không thể xóa dữ liệu do dữ liệu này đã được sử dụng bởi các chức năng khác hoặc dữ liệu đã bị lock'
        );
      })
    });
  }
}
