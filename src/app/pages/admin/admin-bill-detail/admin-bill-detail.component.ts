import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MonthBillDto } from 'src/app/commons/dto/month-bill';
import { ContractService } from 'src/app/services/contract.service';
import { MonthBillService } from 'src/app/services/month-bill.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-admin-bill-detail',
  templateUrl: './admin-bill-detail.component.html',
  styleUrls: ['./admin-bill-detail.component.scss']
})
export class AdminBillDetailComponent {

  monthBillId!: number;
  monthBillDto: MonthBillDto = new MonthBillDto();

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
    this.monthBillId = Number(url[url.length - 1]);

    this.getMonthBillById();
  }

  getMonthBillById(): void {
    this.monthBillService.getBillById(this.monthBillId).subscribe(response => {
      this.monthBillDto = response.data;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi server',
        'Lỗi truyền tải dữ liệu'
      );
    });
  }

  onPrint(): void {
    let data = document.getElementById('pdfContent');
    if (data != null) {
      let unwantedElement = data.querySelector('#no-print');
      if (unwantedElement != null) {
        unwantedElement.classList.add('pdf-hidden'); // Thêm class mới
      }
      window.print();
      if (unwantedElement != null) {
        unwantedElement.classList.remove('pdf-hidden'); // Xóa class mới
      }
    }
  }
}
