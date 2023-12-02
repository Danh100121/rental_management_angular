import { BaseResponse } from "./response";

export class ServiceDto {
    id!: number;
    name!: string;
    price!: number;
    description?: string;
}

export class ServiceRequest {
    name!: string;
    price!: number;
    description?: string;
}

export class ServiceListResponse implements BaseResponse {
    message!: string;
    data!: ServiceDto[];
}

export class ServiceResponse implements BaseResponse {
    message!: string;
    data!: ServiceDto;
}