export class SmsSenderRequest {
    phoneNumber!: string;
    username!: string;
}

export class LoginWithSmsRequest {
    username!: string;
    activeCode!: string;
}

export class EmailSenderRequest {
    email!: string;
    username!: string;
}

export class LoginWithEmailRequest {
    email!: string;
    activeCode!: string;
}