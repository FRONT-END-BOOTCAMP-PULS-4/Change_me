export class LogoutMember {
    constructor(private memberId: string) {}

    public execute(): void {
        // Logic for logging out the member
        console.log(`Member with ID ${this.memberId} has been logged out.`);
    }
}