export class UpdateProfile {
    constructor(private profileData: UpdateProfileDTO) {}

    async execute() {
        // Logic to update the member's profile using this.profileData
        // This could involve calling a repository method to persist the changes
    }
}

export interface UpdateProfileDTO {
    name?: string;
    email?: string;
    password?: string;
    nickname?: string;
    imageUrl?: string;
}