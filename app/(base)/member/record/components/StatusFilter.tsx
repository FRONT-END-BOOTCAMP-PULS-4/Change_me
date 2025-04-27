import { useState, useEffect, useCallback} from 'react';
import styles from './StatusFilter.module.scss';

type StatusFilterProps = {
    selectedStatus: number | null;
    onStatusChange: (status: number | null) => void;
}

const STATUS_OPTIONS = [
    { label: '성공', value: 3 },
    { label: '실패', value: 1 },
    { label: '포기', value: 2 }
];

export default function StatusFilter() {
    const [selectedStatus, setSelectedStatus] = useState<number | null>(null);


    return (
        <div className={styles.filterContainer}>
            {STATUS_OPTIONS.map((option) => (
                <button
                    key={option.value}
                    className={`${styles.filterButton} ${selectedStatus === option.value ? styles.active : ''}`}
                    onClick={() => setSelectedStatus(selectedStatus === option.value ? null : option.value)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}