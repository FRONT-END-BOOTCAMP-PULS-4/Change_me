"use client";

import React, { useState } from "react";
import styles from "./Pager.module.scss";

const {
    ["pager-box"]: pagerBox,
    ["pager"]: pager,
    ["disabled"]: disabled,
    ["page-mover"]: pageMover,
    ["page-nums"]: pageNums,
    ["active"]: active,
} = styles;

type PagerProps = {
    currentPage: number;
    pages: number[];
    endPage: number;
    onPageChange: (newPage: number) => void;
};

export default function Pager({
    currentPage,
    pages,
    endPage,
    onPageChange,
}: PagerProps) {
    const [selected, setSelected] = useState(currentPage);
    const hasNextPage = currentPage + 1 <= endPage;
    const hasPreviousPage = currentPage > 1;

    const handlePageClick = (num: number) => {
        setSelected(num);
        onPageChange(num);
    };

    return (
        <div className={pagerBox}>
            <section className={pager}>
                {hasPreviousPage ? (
                    <button
                        className={pageMover}
                        onClick={() =>
                            onPageChange(Math.max(currentPage - 1, 1))
                        }
                    >
                        이전
                    </button>
                ) : (
                    <div className={`${pageMover} ${disabled}`}>이전</div>
                )}
                <ul className={pageNums}>
                    {pages.map((pageNumber) => (
                        <li key={pageNumber}>
                            <button
                                className={`${pageNumber === currentPage ? active : ""}`}
                                onClick={() => handlePageClick(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        </li>
                    ))}
                </ul>
                {hasNextPage ? (
                    <button
                        className={pageMover}
                        onClick={() =>
                            onPageChange(Math.min(currentPage + 1, endPage))
                        }
                    >
                        다음
                    </button>
                ) : (
                    <div className={`${pageMover} ${disabled}`}>다음</div>
                )}
            </section>
        </div>
    );
}
