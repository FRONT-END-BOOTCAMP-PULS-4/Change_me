"use client";

import React, { FC } from "react";
import styles from "./Pager.module.scss";

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
        <section className="d:flex jc:center ai:center gap:2 h:100p">
            <h1 className="d:none">페이저</h1>
            {hasPreviousPage ? (
                <button
                    className="n-btn"
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                >
                    이전
                </button>
            ) : (
                <div className="n-btn disabled">이전</div>
            )}
            <ul className="n-bar">
                {pages.map((pageNumber) => (
                    <li key={pageNumber}>
                        <button
                            className={`n-btn ${pageNumber === currentPage ? "active" : ""}`}
                            onClick={() => onPageChange(pageNumber)}
                        >
                            {pageNumber}
                        </button>
                    </li>
                ))}
            </ul>
            {hasNextPage ? (
                <button
                    className="n-btn"
                    onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
                >
                    다음
                </button>
            ) : (
                <div className="n-btn disabled">다음</div>
            )}
        </section>
    );
};
