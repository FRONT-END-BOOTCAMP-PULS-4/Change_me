import { getToken } from "./utils";

type FetcherOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: any;
    headers?: Record<string, string>;
};

export async function fetcher<T>( // 제네릭 타입 T를 사용하여 응답 데이터의 타입을 지정할 수 있습니다.
    // T는 파라미터인가?
    // T가 어떤 타입인지 모르겠음
    // T는 제네릭 타입으로, fetcher 함수가 호출될 때 구체적인 타입으로 대체됩니다.
    // 예를 들어, fetcher<MyType>(url)과 같이 호출하면 T는 MyType으로 대체됩니다.
    // 이로 인해 fetcher 함수는 다양한 타입의 응답을 처리할 수 있습니다.
    url: string,
    options: FetcherOptions = {},
): Promise<T> {
    const token = getToken();
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(`${baseUrl}${url}`, { // 패치 형식 정의 ?
        method: options.method || "GET",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const data = await response.json();

    if (response.status === 401) {
        localStorage.removeItem("auth-storage");
        if (typeof window !== "undefined") {
            window.location.href = "/login";
        }
    }

    if (response.status === 403) {
        if (typeof window !== "undefined") {
            window.location.href = "/error/403";
        }
    }

    if (!response.ok) {
        throw new Error(data.message || "잠시 후에 다시 시도해주세요.");
    }

    return data;
}
