export class UpdateProfileDto {
    constructor(
        public name?: string,
        public email?: string,
        public password?: string,
        public nickname?: string,
        public imageUrl?: string
    ) { }
}