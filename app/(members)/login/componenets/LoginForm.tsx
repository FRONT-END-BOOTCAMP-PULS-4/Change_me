"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useMemberStore } from "@/stores/memberStore";

export default function LoginForm() {
    const router = useRouter();
    const setUser = useMemberStore((state) => state.setUser);
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));

        if (name === "email" && !value.includes("@")) {
            setErrors(prev => ({ ...prev, email: "유효한 이메일을 입력해주세요." }));
        } else {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            setErrorMessage("모든 필드를 입력해주세요.");
            return;
        }

        try {
            const res = await fetch("/api/members/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                setErrorMessage(data.errorMessage || "로그인 실패");
                return;
            }

            // localStorage.setItem("access_token", data.token);
            setUser(data.user, data.token);

            console.log("로그인 성공", data);
            router.push("/profile");
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