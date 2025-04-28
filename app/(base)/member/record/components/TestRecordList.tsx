"use client";

import { useAuthStore } from "@/stores/authStore";
import useModalStore from "@/stores/modalStore";
import { useEffect, useState, useCallback } from "react";
import styles from "./TestRecordList.module.scss";
import Loading from "@/app/components/Loading";
import Image from "next/image";
import Pager from "@/app/components/Pager";

type Habit = {
    id: number;
    categoryId: string;
    categoryName: string;
    name: string;
    description: string;
    startAt: string;
    finishedAt: string;
    stoppedAt: string;
    duration: number;
    rate: string;
};

export default function TestRecordList() {
    const [habits, setHabits] = useState<Habit[]>([]);
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [statusTab, setStatusTab] = useState<"success" | "giveup" | "fail">("success");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // 한 페이지에 보여줄 습관 수

    const token = useAuthStore.getState().token;

    // 오늘 날짜 (YYYY-MM-DD)
    const today = new Date().toISOString().slice(0, 10);

    const fetchHabits = useCallback(async () => {
        try {
            setIsLoading(true);
            let url = "/api/members/test-habits/success/";

            if (statusTab === "giveup") {
                url = "/api/members/test-habits/giveup/";
            } else if (statusTab === "fail") {
                url = "/api/members/test-habits/fail/";
            }
            const res = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();
            const habits = Array.isArray(data) ? data : data.habits;
            setHabits(habits);
        } catch (error) {
            console.error("불러오기 실패:", error);
        } finally {
            setIsLoading(false);
        }
    }, [token, statusTab]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("/api/categories");
                const data = await res.json();
                if (Array.isArray(data.categories)) {
                    setCategories(data.categories);
                }
            } catch (error) {
                console.error("카테고리 불러오기 실패:", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchHabits();
    }, [fetchHabits]);

    const filteredHabits = habits.filter(
        (habit) => selectedCategoryId === null || Number(habit.categoryId) === selectedCategoryId
    );
    const totalPages = Math.ceil(filteredHabits.length / itemsPerPage);
    const paginatedHabits = filteredHabits.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className={styles.container}>
            <div className={styles.tabs}>
                <button
                    className={statusTab === "success" ? styles.activeTab : ""}
                    onClick={() => {
                        setStatusTab("success");
                        setSelectedCategoryId(null);
                    }}
                >
                    달성
                </button>
                <button
                    className={statusTab === "fail" ? styles.activeTab : ""}
                    onClick={() => {
                        setStatusTab("fail");
                        setSelectedCategoryId(null);
                    }}
                >
                    실패
                </button>
                <button
                    className={statusTab === "giveup" ? styles.activeTab : ""}
                    onClick={() => {
                        setStatusTab("giveup");
                        setSelectedCategoryId(null);
                    }}
                >
                    포기
                </button>
            </div>
            <div className={styles.headerRow}>
                <div className={styles.category}>
                    <select
                        value={selectedCategoryId ?? ""}
                        onChange={(e) =>
                            setSelectedCategoryId(e.target.value === "" ? null : Number(e.target.value))
                        }
                    >
                        <option value="">전체</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.info}><div className={styles.title}>습관명</div></div>
                {/* <div className={styles.info}><div className={styles.title}>설명</div></div> */}
                <div className={styles.info}><div className={styles.title}>시작일</div></div>
                <div className={styles.info}><div className={styles.title}>종료일</div></div>
                <div className={styles.info}><div className={styles.title}>포기일</div></div>
                <div className={styles.info}><div className={styles.title}>기간</div></div>
                <div className={styles.info}><div className={styles.title}>달성률</div></div>
            </div>
            <div className={styles.habitList}>
                {habits.filter(
                    (habit) => selectedCategoryId === null || Number(habit.categoryId) === selectedCategoryId
                ).length === 0 ? (
                    <div className={styles.empty}>
                        <Image
                            src={
                                statusTab === "success"
                                    ? "/images/Facade.png"
                                    : statusTab === "fail"
                                        ? "/images/Praise.png"
                                        : "/images/Praise.png"
                            }
                            alt={
                                statusTab === "success"
                                    ? "달성한 습관 없음"
                                    : statusTab === "fail"
                                        ? "실패한 습관 없음"
                                        : "포기한 습관 없음"
                            }
                            width={140}
                            height={140}
                            className={styles.emptyImage}
                        />
                        <p>
                            {statusTab === "success" && "아직 달성한 습관이 없어요."}
                            {statusTab === "fail" && (
                                <>
                                    실패한 습관이 아직 없어요!
                                    <br />
                                    잘하고 있어요 :)
                                </>
                            )}
                            {statusTab === "giveup" && (
                                <>
                                    포기한 습관이 아직 없어요!
                                    <br />
                                    잘하고 있어요 :)
                                </>
                            )}
                        </p>
                    </div>
                ) : (
                    paginatedHabits.map((habit) => (
                        <div className={styles.habitCard} key={habit.id}>
                            <div className={styles.category}>{habit.categoryName}</div>
                            <div className={styles.info}>
                                <div className={styles.title}
                                    onClick={() =>
                                        useModalStore
                                            .getState()
                                            .openModal("viewHabit", {
                                                id: habit.id,
                                                name: habit.name,
                                                description: habit.description,
                                            })
                                    }>{habit.name}</div>
                            </div>
                            {/* <div className={styles.info}>
                                    <div className={styles.desc}>{habit.description}</div>
                                </div> */}
                            <div className={styles.info}>
                                <div className={styles.desc}>{habit.startAt}</div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.desc}>{habit.finishedAt}</div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.desc}>{habit.stoppedAt ? habit.stoppedAt : "-"}</div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.desc}>{habit.duration}일</div>
                            </div>
                            <div className={styles.info}>
                                <div className={styles.progress}>{habit.rate}</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <Pager
                currentPage={currentPage}
                pages={pageNumbers}
                endPage={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
            {statusTab === "success" && filteredHabits.length > 0 && (
                <div className={styles.celebrate}>
                    <Image
                        src="/images/Praise.png"
                        alt="칭찬 캐릭터"
                        width={160}
                        height={160}
                    />
                    <p>
                        <strong>{filteredHabits.length}개의 습관</strong>을 만드셨군요!
                        <br />
                        잘하고 있어요 :)
                    </p>
                </div>
            )}

            {statusTab === "fail" && filteredHabits.length > 0 && (
                <div className={styles.celebrate}>
                    <Image
                        src="/images/Together.png"
                        alt="응원 캐릭터"
                        width={160}
                        height={160}
                    />
                    <p>
                        <strong>{filteredHabits.length}개의 습관</strong>을 실패하셨어요.<br />
                        다시 도전해볼까요?
                    </p>
                </div>
            )}

            {statusTab === "giveup" && filteredHabits.length > 0 && (
                <div className={styles.celebrate}>
                    <Image
                        src="/images/Together.png"
                        alt="응원 캐릭터"
                        width={160}
                        height={160}
                    />
                    <p>
                        <strong>{filteredHabits.length}개의 습관</strong>을 실패하셨어요.<br />
                        다시 도전해볼까요?
                    </p>
                </div>
            )}
        </div>
    );
}