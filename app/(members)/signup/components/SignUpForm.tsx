"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function SignUpForm() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("회원가입 시도:", { name, email, password, nickname });

        const res = await fetch("/api/members/join", {
            method: "POST",
            body: JSON.stringify({ name, email, password, nickname }),
            headers: { "Content-Type": "application/json" },
        });

        if (res.ok) {
            console.log("회원가입 성공");
            router.push("/login");
        } else {
            const result = await res.json();
            console.error("회원가입 실패:", result);
        }
    };

    return (
        <div>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">이름</label><br />
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="이름을 입력해주세요"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">이메일</label><br />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="example@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label><br />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="nickname">닉네임</label><br />
                    <input
                        type="text"
                        id="nickname"
                        name="nickname"
                        placeholder="********"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>
                <button type="submit">가입하기</button>
            </form>

            <p>
                이미 계정이 있으신가요? <a href="/login">로그인</a>
            </p>
        </div>
    );
}