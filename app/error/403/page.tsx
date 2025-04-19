import Link from "next/link";

export default function Page403() {
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>403 - Forbidden</h1>
            <p>죄송합니다. 이 페이지에 접근할 권한이 없습니다.</p>
            <Link
                href="/"
                style={{ color: "blue", textDecoration: "underline" }}
            >
                홈으로 돌아가기
            </Link>
        </div>
    );
}
