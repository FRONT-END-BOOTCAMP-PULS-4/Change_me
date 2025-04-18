export class UpdateProfileDto {
    constructor(
        public id: string,
        public nickname: string,
        public imageUrl?: string
    ) { }
}