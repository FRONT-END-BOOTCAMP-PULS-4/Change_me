export class JoinMember {
    constructor(
        public name: string,
        public email: string,
        public password: string
    ) {}

    public async execute(): Promise<void> {
        // Logic for joining a new member goes here
        // This could involve validating the input,
        // checking if the email is already in use,
        // and saving the member to the database.
    }
}