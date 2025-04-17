"use client";

import React, { FC } from "react";
import styles from "./Pager.module.scss";

const {
    ["pager-box"]: pagerBox,
    ["pager"]: pager,
    ["disabled"]: disabled,
} = styles;

type PagerProps = {
    currentPage: number;
    endPage: number;
    pageSize: number; // number of pages to show in the pager
    onPageChange: (newPage: number) => void;
};

const Pager: FC<PagerProps> = ({
    currentPage,
    endPage,
    pageSize,
    onPageChange,
}) => {
    const startNumber = Math.floor((currentPage - 1) / pageSize) * pageSize + 1;
    const pages = Array.from(
        { length: pageSize },
        (_, i) => startNumber + i,
    ).filter((page) => page <= endPage);
    const hasNextPage = startNumber + pageSize <= endPage;
    const hasPreviousPage = currentPage > pageSize;

    return (
        <div className={pagerBox}>
            <section className={pager}>
                <h1>페이저</h1>
                {hasPreviousPage ? (
                    <button
                        onClick={() =>
                            onPageChange(Math.max(currentPage - 1, 1))
                        }
                    >
                        이전
                    </button>
                ) : (
                    <div className={disabled}>이전</div>
                )}
                <ul>
                    {pages.map((pageNumber) => (
                        <li key={pageNumber}>
                            <button
                                className={`${pageNumber === currentPage ? "active" : ""}`}
                                onClick={() => onPageChange(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        </li>
                    ))}
                </ul>
                {hasNextPage ? (
                    <button
                        onClick={() =>
                            onPageChange(Math.max(currentPage - 1, 1))
                        }
                    >
                        다음
                    </button>
                ) : (
                    <div className={disabled}>다음</div>
                )}
            </section>
        </div>
    );
};
