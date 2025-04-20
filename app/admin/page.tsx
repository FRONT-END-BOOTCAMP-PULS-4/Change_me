"use client";

import CategoryList from "./components/CategoryList";
import Title from "./components/Title";
import styles from "./page.module.scss";

export default function AdminPage() {
    return (
        <section className={styles.admin}>
            <Title />
            <CategoryList />
        </section>
    );
}
