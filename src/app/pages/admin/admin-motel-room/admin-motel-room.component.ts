import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { RoomDto } from 'src/app/commons/dto/room';
import { ModalAdminCreateRoomComponent } from '../modal/modal-admin-create-room/modal-admin-create-room.component';
import { ModalAdminUpdateRoomComponent } from '../modal/modal-admin-update-room/modal-admin-update-room.component';
import { RoomService } from './../../../services/room.service';

@Component({
  selector: 'app-admin-motel-room',
  templateUrl: './admin-motel-room.component.html',
  styleUrls: ['./admin-motel-room.component.scss']
})
export class AdminMotelRoomComponent {

  constructor(
    private modalService: NzModalService,
    private notification: NzNotificationService,
    private roomService: RoomService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllRoom();
  }

  listOfDisplayData: RoomDto[] = [];

  total = 1;
  loading = true;
  pageSize = 10;
  pageIndex = 1;

  getAllRoom(): void {
    this.roomService.getAllRoom().subscribe(response => {
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

  showModalCreateRoom(): void {
    const modal = this.modalService.create({
      nzTitle: 'Thêm mới phòng trọ',
      nzContent: ModalAdminCreateRoomComponent,
      nzWidth: 750,
    });
    modal.afterClose.subscribe(() => this.getAllRoom())
  }

  showModalUpdateRoom(roomId: number): void {
    const modal = this.modalService.create({
      nzTitle: 'Cập nhật phòng trọ',
      nzContent: ModalAdminUpdateRoomComponent,
      nzWidth: 750
    });
    modal.componentInstance!.roomId = roomId;
    modal.afterClose.subscribe(() => this.getAllRoom())
  }

  onDeleteRoom(roomId: number): void {
    this.modalService.confirm({
      nzTitle: '<i>Xác nhận</i>',
      nzContent: '<b>Bạn có chắc muốn xóa dữ liệu phòng #' + roomId + '?</b>',
      nzOnOk: () => this.roomService.deleteRoom(roomId).subscribe(response => {
        this.notification.create(
          'success',
          'Thông báo',
          'Xóa dữ liệu phòng trọ thành công!!'
        );
        this.getAllRoom();
      }, error => {
        this.notification.create(
          'error',
          'Lỗi server',
          'Lỗi không thể xóa dữ liệu do dữ liệu này đã được sử dụng bởi các chức năng khác hoặc dữ liệu đã bị lock'
        );
      })
    });
  }

  onViewDetail(roomId: number): void {
    this.modalService.confirm({
      nzTitle: '<i>Xác nhận</i>',
      nzContent: '<b>Bạn muốn xem thông tin chi tiết của phòng #' + roomId + '</b>',
      nzOnOk: () => this.router.navigate(['/admin/room', roomId])
    });
  }
}
