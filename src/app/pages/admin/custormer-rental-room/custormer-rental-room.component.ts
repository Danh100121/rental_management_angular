import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ClientDto } from 'src/app/commons/dto/client';
import { ContractRequest } from 'src/app/commons/dto/contract';
import { ClientService } from 'src/app/services/client.service';
import { ContractService } from 'src/app/services/contract.service';
import { ModalAdminCreateClientComponent } from '../modal/modal-admin-create-client/modal-admin-create-client.component';
import { ModalAdminUpdateClientComponent } from '../modal/modal-admin-update-client/modal-admin-update-client.component';

@Component({
  selector: 'app-custormer-rental-room',
  templateUrl: './custormer-rental-room.component.html',
  styleUrls: ['./custormer-rental-room.component.scss']
})
export class CustomerRentalRoomComponent {

  roomId!: number;

  validateForm!: UntypedFormGroup;
  rowSelectedClient: number = -1;

  contractRequest: ContractRequest = new ContractRequest();

  constructor(
    private modalService: NzModalService,
    private fb: UntypedFormBuilder,
    private notification: NzNotificationService,
    private clientService: ClientService,
    private contractService: ContractService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const url = this.router.url.split('/');
    this.roomId = Number(url[url.length - 1]);

    this.validateForm = this.fb.group({
      startDate: [null, [Validators.required]],
      dueDate: [null, [Validators.required]],
      roomDeposit: [null, [Validators.required]],
      note: [null, [Validators.required]]
    });
    this.getAllClient();
  }

  listOfDisplayData: ClientDto[] = [];

  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  getAllClient(): void {
    this.clientService.getAllClient().subscribe(response => {
      this.listOfDisplayData = response.data.filter(e => e.clientStatus.toString() == "AVAILABLE");
      this.loading = false;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi server',
        'Lỗi truyền tải dữ liệu'
      );
    });
  }

  showModalCreateClient(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới khách hàng',
      nzContent: ModalAdminCreateClientComponent,
      nzWidth: 750,
    });
    modal.afterClose.subscribe(() => this.getAllClient())
  }

  showModalUpdateClient(clientId: number): void {
    const modal = this.modalService.create({
      nzTitle: 'Câp nhât thông tin khách hàng',
      nzContent: ModalAdminUpdateClientComponent,
      nzWidth: 750,
    });
    modal.componentInstance!.clientId = clientId;
    modal.afterClose.subscribe(() => this.getAllClient())
  }

  onDeleteClient(clientId: number): void {
    this.modalService.confirm({
      nzTitle: '<i>Xác nhận</i>',
      nzContent: '<b>Bạn có chắc muốn xóa dữ liệu khách hàng #' + clientId + '?</b>',
      nzOnOk: () => this.clientService.deleteClient(clientId).subscribe(response => {
        this.notification.create(
          'success',
          'Thông báo',
          'Xóa dữ liệu khách hàng thành công!!'
        );
        this.getAllClient();
      }, error => {
        this.notification.create(
          'error',
          'Lỗi server',
          'Lỗi không thể xóa dữ liệu do dữ liệu này đã được sử dụng bởi các chức năng khác hoặc dữ liệu đã bị lock'
        );
      })
    });
  }

  onRental(): void {
    if (this.rowSelectedClient == -1) {
      this.notification.create(
        'error',
        'Lỗi dữ liệu',
        'Vui lòng chọn một khách hàng để xác nhận'
      );
    } else if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);

      this.contractRequest = {
        note: this.validateForm.value.note,
        startDate: this.validateForm.value.startDate,
        dueDate: this.validateForm.value.dueDate,
        roomDeposit: this.validateForm.value.roomDeposit,
        clientId: this.rowSelectedClient,
        roomId: this.roomId,
      }

      // console.log(this.contractRequest)
      this.contractService.createContract(this.contractRequest).subscribe(response => {
        this.notification.create(
          'success',
          'Thông báo',
          'Tạo hợp đồng thành công'
        );

        this.router.navigate(['/admin/contract/client', this.rowSelectedClient]);
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

  clickEvent(clientId: number): void {
    this.rowSelectedClient = clientId;
  }
}
