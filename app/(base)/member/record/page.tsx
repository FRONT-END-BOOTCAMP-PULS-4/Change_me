"use client";
import React from "react";
import { useAuthStore } from "@/stores/authStore";
import StatusFilter from "./components/StatusFilter"; // 상태 필터 컴포넌트
import HabitList from "./components/HabitList";
import Pager from "@/app/components/Pager";
import { getToken } from "@/utils/utils";
import {useHabit} from "@/hooks/useHabit";
import {fetcher} from "@/utils/fetcher";
// 예를 들어, fetcher<MyType>(url)과 같이 호출하면 T는 MyType으로 대체됩니다. 
// from "@/app/utils/fetcher";
// import { useRouter, useSearchParams } from "next/navigation";// node_modules
// useRouter, useSearchParams는 Next.js의 라우팅 기능을 사용하기 위한 훅입니다.
// useRouter는 현재 라우터 객체에 접근할 수 있게 해주고, useSearchParams는 URL의 쿼리 파라미터를 쉽게 다룰 수 있게 해줍니다.
// 라우터는 뭐야?
// 사용 예시
// import { useRouter } from "next/navigation";

// export default function Example() {
//     const router = useRouter(); // 선언언

//     const goToPage = () => {  //         // 페이지 이동
// goToPage함수를 호출하면 
//         router.push("/new-page"); // "/new-page"로 이동
//     };

//     return <button onClick={goToPage}>Go to New Page</button>;
import { useSearchParams } from "next/navigation";

// export default function Example() {
//     const searchParams = useSearchParams();
//     const category = searchParams.get("category"); // URL에서 "category" 파라미터 값 가져오기

//     return <div>Selected Category: {category}</div>;
// }
// 쌈뽕하게 만들어보자

// 컴포넌트





export default async function page() {
    // 토큰 가져오기
    const token = useAuthStore.getState().token;

    // api 호출
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    fetcher<any>(`${baseUrl}/`, {method : "GET", headers : {},body: {}}); // 제네릭 타입 T를 사용하여 응답 데이터의 타입을 지정할 수 있습니다.
    // fetcher 함수는 다양한 타입의 응답을 처리할 수 있습니다.
    // 값을 받아와서 저장


    return (
        <div>
            <h2>기록 보기</h2>
            <div>API 테스트:{}</div>
            {/* <StatusFilter 
            />
            <HabitList />
            <Pager /> */}
        </div>
    )
}



// "use client";
// import React from "react";
// import TestRecordList from "./components/TestRecordList";

// export default function page() {
//     return (
//         <>
//             {/* <TestRecordList /> */}
//         </>
//     );
// }


