export class ProfileDto {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public nickname: string,
        public createdAt: string,
        public imageUrl?: string | null
    ) { }
}