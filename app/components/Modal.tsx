import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.scss";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };

        document.addEventListener("keyup", handleEsc);

        return () => {
            document.removeEventListener("keyup", handleEsc);
        };
    }, [isOpen, onClose]);

    return createPortal(
        <div className={styles.overlay} onClick={onClose}>
            <div
                className={styles.content}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.body,
    );
}
