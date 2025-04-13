export class WithdrawMemberDTO {
    constructor(
        public memberId: string,
        public reason?: string
    ) {}
}