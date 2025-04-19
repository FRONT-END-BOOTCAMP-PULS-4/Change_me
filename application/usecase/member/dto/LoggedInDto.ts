export class LoggedInDto {
    constructor(
        public token: string,
        public user: {
            id: string;
            name: string;
            email: string;
            nickname: string;
            role: number;
        },
    ) {}
}
