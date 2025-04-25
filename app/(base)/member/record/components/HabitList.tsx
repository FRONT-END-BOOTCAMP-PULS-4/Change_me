import { Habit } from '@/hooks/useHabit';
import styles from './HabitList.module.scss';

interface HabitListProps {
    habits: Habit[];
    isLoading: boolean;
}

export default function HabitList({ habits, isLoading }: HabitListProps) {
    if (isLoading) return <div>로딩 중...</div>;
    
    if (habits.length === 0) {
        return <div className={styles.empty}>조회된 습관이 없습니다.</div>;
    }

    return (
        <div className={styles.habitGrid}>
            {habits.map((habit) => (
                <div key={habit.id} className={styles.habitCard}>
                    <h3 className={styles.title}>{habit.name}</h3>
                    <p className={styles.category}>{habit.categoryname}</p>
                    <p className={styles.description}>{habit.description}</p>
                    <div className={styles.details}>
                        <span>기간: {habit.duration}</span>
                        <span>달성률: {habit.rate}%</span>
                    </div>
                </div>
            ))}
        </div>
    );
}