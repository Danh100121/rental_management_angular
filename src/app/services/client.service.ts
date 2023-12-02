import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOT_API } from '../commons/constants/api';
import { ClientRequest, ClientResponse, ListClientResponse } from '../commons/dto/client';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private baseURL = ROOT_API + "/clients";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    createClient(clientRequest: ClientRequest): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(`${this.baseURL}`, clientRequest, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    getAllClient(): Observable<ListClientResponse> {
        console.log(this.authService.getToken());
        return this.httpClient.get<ListClientResponse>(`${this.baseURL}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    getClientById(clientId: number): Observable<ClientResponse> {
        return this.httpClient.get<ClientResponse>(`${this.baseURL}/${clientId}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    updateClient(clientId: number, clientRequest: ClientRequest): Observable<ClientResponse> {
        return this.httpClient.put<ClientResponse>(`${this.baseURL}/${clientId}`, clientRequest, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }

    deleteClient(clientId: number): Observable<number> {
        return this.httpClient.delete<number>(`${this.baseURL}/${clientId}`, {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        });
    }
}
