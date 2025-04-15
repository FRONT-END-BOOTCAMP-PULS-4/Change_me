type Props = {
    profile: {
        name: string;
        email: string;
        nickname: string;
        createdAt: string;
    };
};

export default function ProfileForm({ profile }: Props) {
    return (
        <div>
            <h2>프로필</h2>
            <p>{profile.createdAt} 가입</p>
            <div>
                <strong>이름</strong> <div>{profile.name}</div>
                <strong>이메일</strong> <div>{profile.email}</div>
                <strong>닉네임</strong> <div>{profile.nickname}</div>
            </div>
        </div>
    );
}