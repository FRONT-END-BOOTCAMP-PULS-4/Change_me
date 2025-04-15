"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));

        // 간단한 유효성 검사 예시
        if (name === "email" && !value.includes("@")) {
            setErrors(prev => ({ ...prev, email: "유효한 이메일을 입력해주세요." }));
        } else {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 간단한 유효성 검사
        if (!form.email || !form.password) {
            setErrorMessage("모든 필드를 입력해주세요.");
            return;
        }

        // setErrorMessage("");
        // console.log("로그인 시도:", form);

        try {
            const res = await fetch("/api/members/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                setErrorMessage(data.errorMessage || "로그인 실패");
                return;
            }

            console.log("로그인 성공", data);
            router.push("/profile");
            // 성공 시 페이지 이동 또는 상태 업데이트 등
        } catch (err) {
            setErrorMessage("서버 오류가 발생했습니다.");
        }
    };

    return (
        <div>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">이메일</label><br />
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="example@example.com"
                    />
                    {errors.email && (
                        <div>{errors.email}</div>
                    )}
                </div>

                <div style={{ marginBottom: "1rem" }}>
                    <label htmlFor="password">비밀번호</label><br />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="********"
                    />
                    {errors.password && (
                        <div>{errors.password}</div>
                    )}
                </div>
                {errorMessage && (
                    <div>{errorMessage}</div>
                )}

                <button type="submit">
                    로그인
                </button>
                <p>
                    아직 계정이 없으신가요? <a href="/signup">회원가입</a>
                </p>
            </form>
        </div>
    );
}