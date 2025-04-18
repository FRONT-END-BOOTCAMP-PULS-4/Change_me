// export interface ProfileDto {
//     id: string;
//     name: string;
//     email: string;
//     nickname: string;
//     createdAt: string;
// }

export class ProfileDto {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public nickname: string,
        public createdAt: string
    ) { }
}