import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ROOT_API } from '../commons/constants/api';
import { ContractRequest, ContractResponse, ListContractResponse } from '../commons/dto/contract';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class ContractService {
    private baseURL = ROOT_API + "/contracts";
    constructor(private httpClient: HttpClient, private authService: AuthService) { }

    createContract(contractRequest: ContractRequest): Observable<ContractResponse> {
        return this.httpClient.post<ContractResponse>(`${this.baseURL}`, contractRequest, {
            headers: new HttpHeaders({
              'Authorization': `Bearer ${this.authService.getToken()}`
            })
          });
    }

    getContractOfClient(clientId: number): Observable<ListContractResponse> {
        return this.httpClient.get<ListContractResponse>(`${this.baseURL}/client/${clientId}`, {
            headers: new HttpHeaders({
              'Authorization': `Bearer ${this.authService.getToken()}`
            })
          });
    }

    getContractById(contractId: number): Observable<ContractResponse> {
        return this.httpClient.get<ContractResponse>(`${this.baseURL}/${contractId}`, {
            headers: new HttpHeaders({
              'Authorization': `Bearer ${this.authService.getToken()}`
            })
          });
    }

}
