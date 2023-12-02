export class AccountDto {
    id!: string;
    username!: string;
    authority!: string;
    email!: string;
}

export class AccountListRes implements BaseResponse {
    message!: string;
    data!: AccountDto[];
}

export class AccountRes implements BaseResponse {
    message!: string;
    data!: AccountDto;
}

export class AccountRegister {
    username!: string;
    email!: string;
    authority!: RoleEnum;
    password!: string;
}

export class AccountReq {
    username!: string;
    email!: string;
    authority!: string;
}

export class AccountLogin {
    username!: string;
    password!: string;
}

import { BaseResponse } from "./response";

export class JwtResponse implements BaseResponse {
    message!: string;
    data!: JwtData;
}

export class JwtData {
    token!: string;
    type!: string;
    id!: string;
    username!: string;
    email!: string;
    role!: string;
}

export class LoginWithTotpRequest {
    username!: string;
    activeCode!: string;
}

export enum RoleEnum {
    ADMIN
}