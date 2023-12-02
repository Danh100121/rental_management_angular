import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOT_API } from '../commons/constants/api';
import { ServiceListResponse, ServiceRequest, ServiceResponse } from '../commons/dto/services';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ServicesService {
    private baseURL = ROOT_API + "/services";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    createService(serviceRequest: ServiceRequest): Observable<ServiceResponse> {
        return this.httpClient.post<ServiceResponse>(`${this.baseURL}`, serviceRequest, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    getAllService(): Observable<ServiceListResponse> {
        return this.httpClient.get<ServiceListResponse>(`${this.baseURL}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    getServiceById(serviceId: number): Observable<ServiceResponse> {
        return this.httpClient.get<ServiceResponse>(`${this.baseURL}/${serviceId}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    updateService(serviceId: number, serviceRequest: ServiceRequest): Observable<ServiceResponse> {
        return this.httpClient.put<ServiceResponse>(`${this.baseURL}/${serviceId}`, serviceRequest, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    deleteService(serviceId: number): Observable<number> {
        return this.httpClient.delete<number>(`${this.baseURL}/${serviceId}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }
}