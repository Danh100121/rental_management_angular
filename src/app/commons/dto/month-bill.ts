import { ContractDto } from "./contract";
import { BaseResponse } from "./response";
import { ServiceDto } from "./services";

export class CreateMonthBillRequest {
    dueDate!: Date;
    paymentDate!: Date;
    note?: string;
    usedServiceRequests!: UsedServiceRequest[];
    contractId!: number;
}

export class UsedServiceRequest {
    serviceId!: number;
    quantity!: number;
}

export class MonthBillDto {
    id!: number;
    dueDate!: Date;
    paymentDate!: Date;
    totalPrice!: number;
    note?: string;
    contractDto!: ContractDto;
    usedServiceDtoList!: UsedServiceDto[];
}

export class UsedServiceDto {
    id!: number;
    serviceDto!: ServiceDto;
    quantity!: number;
    totalPrice!: number;
}

export class MonthBillResponse implements BaseResponse {
    message!: string;
    data!: MonthBillDto;
}

export class MonthBillListResponse implements BaseResponse {
    message!: string;
    data!: MonthBillDto[];
}