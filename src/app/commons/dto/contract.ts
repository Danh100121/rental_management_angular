import { ClientDto } from "./client";
import { BaseResponse } from "./response";
import { RoomDto } from "./room";

export class ContractDto {
    id!: number;
    createdAt!: Date;
    note?: string;
    startDate!: Date;
    dueDate!: Date;
    roomDeposit!: number;
    clientDto!: ClientDto;
    roomDto!: RoomDto;
}

export class ContractRequest {
    note?: string;
    startDate!: Date;
    dueDate!: Date;
    roomDeposit!: number;
    clientId!: number;
    roomId!: number;
}

export class ContractResponse implements BaseResponse {
    message!: string;
    data!: ContractDto;
}

export class ListContractResponse implements BaseResponse {
    message!: string;
    data!: ContractDto[];
}