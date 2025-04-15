type Props = {
    profile: {
        name: string;
        email: string;
        nickname: string;
        createdAt: string;
    };
};

export default function ProfileForm({ profile }: Props) {
    const createdAt = new Date(profile.createdAt);
    // KST로 보정
    const kst = new Date(createdAt.getTime() + 9 * 60 * 60 * 1000);
    // YYYY.MM.DD 포맷
    const formattedDate = `${kst.getFullYear()}.${String(kst.getMonth() + 1).padStart(2, "0")}.${String(kst.getDate()).padStart(2, "0")}`;

    return (
        <div>
            <h2>프로필</h2>
            <p>{formattedDate} 가입</p>
            <div>
                <strong>이름</strong> <div>{profile.name}</div>
                <strong>이메일</strong> <div>{profile.email}</div>
                <strong>닉네임</strong> <div>{profile.nickname}</div>
            </div>
        </div>
    );
}