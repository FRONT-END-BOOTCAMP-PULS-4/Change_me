export class WithdrawMemberDto {
    constructor(
        public memberId: string,
        public reason?: string
    ) { }
}