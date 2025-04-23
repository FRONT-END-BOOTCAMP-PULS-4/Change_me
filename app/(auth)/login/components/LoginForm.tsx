"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import styles from "./LoginForm.module.scss";
import { useToastStore } from "@/stores/toastStore";

export default function LoginForm() {
    const router = useRouter();
    const { login, setToken } = useAuthStore();
    const [form, setForm] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>(
        {},
    );
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!errorMessage) return;

        const timer = setTimeout(() => {
            setErrorMessage("");
        }, 3000); // 3초 후 사라짐

        return () => clearTimeout(timer); // cleanup
    }, [errorMessage]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));

        if (name === "email" && !value.includes("@")) {
            setErrors((prev) => ({
                ...prev,
                email: "유효한 이메일을 입력해주세요.",
            }));
        } else {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.email || !form.password) {
            setErrorMessage("모든 필드를 입력해주세요.");
            return;
        }

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                setErrorMessage(data.errorMessage || "로그인 실패");
                useToastStore.getState().show("로그인 실패");
                return;
            }

            login(data.user);
            setToken(data.token);

            const returnURL = localStorage.getItem("returnURL");
            if (returnURL) {
                localStorage.removeItem("returnURL");
                router.push(returnURL);
            } else {
                router.push("/member/daily-routine");
            }
        } catch (err) {
            setErrorMessage("서버 오류가 발생했습니다.");
        }
    };

    return (
        <div className={styles.container}>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">이메일(아이디)</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="이메일"
                    />
                    {errors.email && (
                        <div className={styles.error}>{errors.email}</div>
                    )}
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="비밀번호"
                    />
                    {errors.password && (
                        <div className={styles.error}>{errors.password}</div>
                    )}
                </div>

                <button type="submit" className={styles.submitButton}>
                    로그인
                </button>

                <p className={styles.bottomText}>
                    계정이 없으신가요? <a href="/signup">회원가입하기</a>
                </p>
            </form>
        </div>
    );
}
