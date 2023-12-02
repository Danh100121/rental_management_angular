import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { RoomDto } from 'src/app/commons/dto/room';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-admin-room-detail',
  templateUrl: './admin-room-detail.component.html',
  styleUrls: ['./admin-room-detail.component.scss']
})
export class AdminRoomDetailComponent {
  price = 1500000;
  roomId!: number;

  roomDetail: RoomDto = new RoomDto();

  constructor(
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private roomService: RoomService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const url = this.router.url.split('/');
    this.roomId = Number(url[url.length - 1]);
    this.getRoomDetail();
  }

  getRoomDetail(): void {
    this.roomService.getRoomById(this.roomId).subscribe(response => {
      this.roomDetail = response.data;
    }, error => {
      this.notification.create(
        'error',
        'Lỗi máy chủ',
        'Có lỗi xảy ra vui lòng thử lại sau'
      );
    })
  }

  onRental(): void {
    this.router.navigate(['/admin/rental-room', this.roomId]);
  }
}
