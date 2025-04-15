"use client";

export default function LogoutButton() {
    const handleLogout = () => {
        // access_token 삭제
        localStorage.removeItem("access_token");
        // 로그인 페이지로 이동
        window.location.href = "/login";
    };

    return (
        <button onClick={handleLogout} style={{ marginTop: "2rem", color: "red" }}>
            로그아웃
        </button>
    );
}