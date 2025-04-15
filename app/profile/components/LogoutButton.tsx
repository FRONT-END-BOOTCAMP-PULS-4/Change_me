"use client";

export default function LogoutButton() {
    const handleLogout = async () => {
        const res = await fetch("/api/members/logout", {
            method: "POST",
            credentials: "include",
        });

        if (res.ok) {
            window.location.href = "/login"; // 로그아웃 후 로그인 페이지로 이동
        } else {
            alert("로그아웃 실패");
        }
    };

    return (
        <button onClick={handleLogout} style={{ marginTop: "2rem", color: "red" }}>
            로그아웃
        </button>
    );
}