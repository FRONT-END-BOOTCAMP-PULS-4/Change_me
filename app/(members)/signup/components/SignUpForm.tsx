"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function SignUpForm() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isEmailChecked, setIsEmailChecked] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    useEffect(() => {
        if (confirmPassword) {
            if (confirmPassword !== password) {
                setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
            } else {
                setConfirmPasswordError("");
            }
        }
    }, [password, confirmPassword]);

    // 이메일 중복 검사
    const handleEmailCheck = async () => {
        if (!email) {
            alert("이메일을 입력해주세요.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailError("올바른 이메일 형식이 아닙니다.");
            return;
        }

        const res = await fetch("/api/members/email-check", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        const data = await res.json();
        if (data.isDuplicated) {
            setEmailError("이미 사용 중인 이메일입니다.");
            setIsEmailChecked(false);
        } else {
            alert("사용 가능한 이메일입니다.");
            setEmailError("");
            setIsEmailChecked(true);
        }
    };

    // 이메일 형식 검사
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setIsEmailChecked(false); // 이메일 변경 시 중복확인 무효화

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            setEmailError("올바른 이메일 형식이 아닙니다.");
        } else {
            setEmailError("");
        }
    };

    // 비밀번호 형식 검사
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);

        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{8,16}$/;

        if (!passwordRegex.test(value)) {
            setPasswordError(
                "비밀번호는 8~16자이며, 대문자/소문자/숫자/특수문자를 모두 포함해야 합니다."
            );
        } else {
            setPasswordError("");
        }
    };

    // 비밀번호와 비밀번호 확인 비교
    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfirmPassword(value);

        if (value !== password) {
            setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
        } else {
            setConfirmPasswordError("");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !password || !nickname) {
            alert("모든 필드를 입력해주세요.");
            return;
        }

        if (emailError || passwordError) {
            alert("입력한 정보가 올바르지 않습니다.");
            return;
        }

        if (!isEmailChecked) {
            alert("이메일 중복 확인을 완료해주세요.");
            return;
        }

        if (confirmPassword !== password) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

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
                        onChange={handleEmailChange}
                    />
                    <button type="button" onClick={handleEmailCheck}>
                        중복확인
                    </button>
                    {emailError && (
                        <div style={{ color: "red", fontSize: "12px" }}>{emailError}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label><br />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="********"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    {passwordError && (
                        <div style={{ color: "red", fontSize: "12px" }}>{passwordError}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="confirmPassword">비밀번호 확인</label><br />
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="********"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    {confirmPasswordError && (
                        <div style={{ color: "red", fontSize: "12px" }}>{confirmPasswordError}</div>
                    )}
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