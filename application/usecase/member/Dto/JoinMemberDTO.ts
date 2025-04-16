export class JoinMemberDto {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public nickname: string
    ) { }
}