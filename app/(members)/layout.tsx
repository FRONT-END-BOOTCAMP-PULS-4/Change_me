export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <h1>member 레이아웃</h1>
            {children}
        </div>
    );
}
