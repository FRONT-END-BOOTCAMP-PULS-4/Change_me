export class Member {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string,
        public nickname: string,
        public imageUrl: string | null,
        public role: number,
        public createdAt: Date,
        public modifiedAt: Date | null,
        public deletedAt: Date | null
    ) { }
}