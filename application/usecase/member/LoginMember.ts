export class LoginMember {
    constructor(private email: string, private password: string) {}

    public async execute(): Promise<void> {
        // Logic for logging in the member
        // This could involve validating the credentials,
        // interacting with a database, and managing sessions.
    }
}