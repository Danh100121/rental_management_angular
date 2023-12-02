import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { RoomStatus } from 'src/app/commons/constants/status';
import { RoomRequest } from './../../../../commons/dto/room';
import { RoomService } from './../../../../services/room.service';

@Component({
  selector: 'app-modal-admin-create-room',
  templateUrl: './modal-admin-create-room.component.html',
  styleUrls: ['./modal-admin-create-room.component.scss']
})
export class ModalAdminCreateRoomComponent {
  createRoomRequest: RoomRequest = new RoomRequest();
  validateForm!: UntypedFormGroup;

  constructor(
    private modal: NzModalRef,
    private fb: UntypedFormBuilder,
    private roomService: RoomService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description: [null, [Validators.required]],
      buildingName: [null, [Validators.required]],
      address: [null, [Validators.required]],
      roomArea: [null, [Validators.required]],
    });
  }

  destroyModal(): void {
    this.modal.close();
  }

  createRoom(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      let buildingRequest = {
        name: this.validateForm.value.buildingName,
        address: this.validateForm.value.address,
        description: "None",
      }

      this.createRoomRequest = {
        name: this.validateForm.value.name,
        type: this.validateForm.value.type,
        price: this.validateForm.value.price,
        roomArea: this.validateForm.value.roomArea,
        status: RoomStatus.AVAILABLE,
        description: this.validateForm.value.description,
        buildingRequest: buildingRequest,
      }

      console.log(this.createRoomRequest)
      this.roomService.createRoom(this.createRoomRequest).subscribe(response => {
        this.destroyModal();
        this.notification.create(
          'success',
          'Thông báo',
          'Thêm mới phòng thành công'
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
}
