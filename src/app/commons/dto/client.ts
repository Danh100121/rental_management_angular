import { ClientStatus } from './../constants/status';
import { BaseResponse } from "./response";

export class ClientRequest {
    fullName!: string;
    phoneNumber!: string;
    email!: string;
    address!: string;
    idCard!: string;
    note!: string;
    clientStatus?: ClientStatus;
}

export class ClientDto {
    id!: number;
    fullName!: string;
    phoneNumber!: string;
    email!: string;
    address!: string;
    idCard!: string;
    note!: string;
    clientStatus!: ClientStatus;
}

export class ListClientResponse implements BaseResponse {
    message!: string;
    data!: ClientDto[];
}

export class ClientResponse implements BaseResponse {
    message!: string;
    data!: ClientDto;
}