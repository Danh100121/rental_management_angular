import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ContractDto } from 'src/app/commons/dto/contract';
import { CreateMonthBillRequest, UsedServiceDto, UsedServiceRequest } from 'src/app/commons/dto/month-bill';
import { ServiceDto } from 'src/app/commons/dto/services';
import { ContractService } from 'src/app/services/contract.service';
import { MonthBillService } from 'src/app/services/month-bill.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-admin-month-bill',
  templateUrl: './admin-month-bill.component.html',
  styleUrls: ['./admin-month-bill.component.scss']
})
export class AdminMonthBillComponent {

  contractId!: number;
  contractDto: ContractDto = new ContractDto();

  servicesList: ServiceDto[] = [];
  servicesListData: UsedServiceDto[] = [];

  validateForm!: UntypedFormGroup;

  fixPrice: string = "Đơn giá";

  usedServiceRequestList: UsedServiceRequest[] = []
  createMonthBillRequest: CreateMonthBillRequest = new CreateMonthBillRequest();

  constructor(
    private monthBillService: MonthBillService,
    private contractService: ContractService,
    private router: Router,
    private notification: NzNotificationService,
    private fb: UntypedFormBuilder,
    private servicesService: ServicesService
  ) { }

  ngOnInit(): void {
    const url = this.router.url.split('/');
    this.contractId = Number(url[url.length - 1]);

    this.getContractById();
    this.getServices();

    this.validateForm = this.fb.group({
      serviceId: [null, [Validators.required]],
      quantity: [1, [Validators.required]],
      note: [null],
    });
  }

  getContractById(): void {
    this.contractService.getContractById(this.contractId).subscribe(response => {
      this.contractDto = response.data;
      let serviceRoot: ServiceDto = {
        id: -1,
        name: "Thuê nhà",
        price: this.contractDto.roomDto.price - this.contractDto.roomDeposit
      };
      this.servicesListData.push({
        id: 0,
        quantity: 1,
        serviceDto: serviceRoot,
        totalPrice: serviceRoot.price
      })
    }, error => {
      this.notification.create(
        'error',
        'Lỗi server',
        'Lỗi truyền tải dữ liệu'
      );
    });
  }

  getServices(): void {
    this.servicesService.getAllService().subscribe(response => {
      this.servicesList = response.data;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi server',
        'Lỗi truyền tải dữ liệu'
      );
    })
  }

  addService(): void {
    if (this.validateForm.valid) {
      console.log(this.validateForm.value)
      let indexExist = this.servicesListData.findIndex(e => e.serviceDto.id == this.validateForm.value.serviceId);

      if (indexExist == -1) {
        let indexService: number = this.servicesList.findIndex(e => e.id == this.validateForm.value.serviceId);
        let service: ServiceDto = this.servicesList[indexService];

        let serviceData: UsedServiceDto = {
          id: -1,
          serviceDto: service,
          quantity: this.validateForm.value.quantity,
          totalPrice: this.validateForm.value.quantity * service.price
        }

        this.servicesListData.push(serviceData);
      } else {
        this.servicesListData[indexExist].quantity += this.validateForm.value.quantity
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

  removeService(serviceId: any): void {
    let index = this.servicesListData.findIndex(e => e.serviceDto.id == serviceId)
    this.servicesListData.splice(index, 1);
  }

  onChangeService(serviceId: number): void {
    let indexExist = this.servicesList.findIndex(e => e.id == serviceId);
    let price = this.servicesList[indexExist].price;
    this.fixPrice = price.toLocaleString().replaceAll(",", ".") + ' đ';
  }

  saveInfo(): void {
    if (this.validateForm.valid) {
      this.servicesListData.forEach(e => {
        if (e.id != 0)
          this.usedServiceRequestList.push({
            serviceId: e.serviceDto.id,
            quantity: e.quantity
          })
      });

      this.createMonthBillRequest = {
        contractId: this.contractId,
        dueDate: new Date(),
        paymentDate: new Date(),
        note: "None",
        usedServiceRequests: this.usedServiceRequestList
      }

      this.monthBillService.createMonthBill(this.createMonthBillRequest).subscribe(data => {
        this.notification.create(
          'info',
          'Lưu dữ liệu',
          'Đã lưu thông tin hóa đơn'
        );
        this.router.navigate(['/admin/contract/client', this.contractDto.clientDto.id])
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
}
