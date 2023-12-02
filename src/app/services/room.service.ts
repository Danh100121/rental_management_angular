import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOT_API } from '../commons/constants/api';
import { ListRoomResponse, RoomRequest, RoomResponse } from '../commons/dto/room';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    private baseURL = ROOT_API + "/rooms";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    createRoom(roomRequest: RoomRequest): Observable<RoomResponse> {
        return this.httpClient.post<RoomResponse>(`${this.baseURL}`, roomRequest, {
            headers: new HttpHeaders({
              'Authorization': `Bearer ${this.authService.getToken()}`
            })
          });
    }

    getAllRoom(): Observable<ListRoomResponse> {
        return this.httpClient.get<ListRoomResponse>(`${this.baseURL}`, {
            headers: new HttpHeaders({
              'Authorization': `Bearer ${this.authService.getToken()}`
            })
          });
    }

    getRoomById(roomId: number): Observable<RoomResponse> {
        return this.httpClient.get<RoomResponse>(`${this.baseURL}/${roomId}`, {
            headers: new HttpHeaders({
              'Authorization': `Bearer ${this.authService.getToken()}`
            })
          });
    }

    updateRoom(roomId: number, roomRequest: RoomRequest): Observable<RoomResponse> {
        return this.httpClient.put<RoomResponse>(`${this.baseURL}/${roomId}`, roomRequest, {
            headers: new HttpHeaders({
              'Authorization': `Bearer ${this.authService.getToken()}`
            })
          });
    }

    deleteRoom(roomId: number): Observable<number> {
        return this.httpClient.delete<number>(`${this.baseURL}/${roomId}`, {
            headers: new HttpHeaders({
              'Authorization': `Bearer ${this.authService.getToken()}`
            })
          });
    }

}
