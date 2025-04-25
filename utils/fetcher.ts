import { getToken } from "./utils";

type FetcherOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: any;
    headers?: Record<string, string>;
};

export async function fetcher<T>(
    url: string,
    options: FetcherOptions = {},
): Promise<T> {
    const token = getToken();
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const response = await fetch(`${baseUrl}${url}`, {
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
        throw new Error("잠시 후에 다시 시도해주세요.");
    }

    return data;
}
