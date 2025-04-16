// export class GetProfileDTO {
//     constructor(
//         public memberId: string
//     ) {}
// }

export interface ProfileDto {
    id: string;
    name: string;
    email: string;
    nickname: string;
    createdAt: string;
}