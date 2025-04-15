// export class Member {
//     constructor(
//         public id: string,
//         public name: string,
//         public email: string,
//         public password: string,
//         public nickname: string,
//         public imageUrl: string,
//         public role: number,
//         public createdAt: Date,
//         public modifiedAt: Date,
//         public deletedAt: Date
//     ) {}
// }

export interface MemberProps {
    id?: string;
    name: string;
    email: string;
    password: string;
    nickname: string;
    createdAt?: Date;
}

export class Member {
    private constructor(public props: MemberProps) { }

    static create(props: MemberProps) {
        return new Member({ ...props, createdAt: new Date() });
    }
}