import { useEffect, useRef, useState } from "react";
import styles from "./BottomSheetModal.module.css";

export default function BottomSheetModal({ onClose }) {
    const modalRef = useRef(null);
    const startY = useRef(0);
    const dragging = useRef(false);
    const [offsetY, setOffsetY] = useState(0);
    const [animate, setAnimate] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    // 모달 mount 시 슬라이드 업
    useEffect(() => {
        requestAnimationFrame(() => setIsVisible(true));
    }, []);

    // 바깥 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                triggerClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const triggerClose = () => {
        setAnimate(true);
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300); // 애니메이션 시간과 동일
    };

    const handleTouchStart = (e) => {
        startY.current = e.touches[0].clientY;
        dragging.current = true;
        setAnimate(false);
    };

    const handleTouchMove = (e) => {
        if (!dragging.current) return;
        const delta = e.touches[0].clientY - startY.current;
        if (delta > 0) setOffsetY(delta);
    };

    const handleTouchEnd = () => {
        if (!dragging.current) return;
        dragging.current = false;
        setAnimate(true);
        if (offsetY > 100) triggerClose();
        else setOffsetY(0);
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!dragging.current) return;
            const delta = e.clientY - startY.current;
            if (delta > 0) setOffsetY(delta);
        };
        const handleMouseUp = () => {
            if (!dragging.current) return;
            dragging.current = false;
            setAnimate(true);
            if (offsetY > 100) triggerClose();
            else setOffsetY(0);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [offsetY]);

    return (
        <div className={styles.overlay}>
            <div
                ref={modalRef}
                className={`${styles.modal} ${animate ? styles.modalAnimated : ''} ${isVisible ? styles.modalOpen : styles.modalClose}`}
                style={{ transform: `translateY(${offsetY}px)` }}
            >
                <div
                    className={styles.dragHandle}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={(e) => {
                        startY.current = e.clientY;
                        dragging.current = true;
                        setAnimate(false);
                    }}
                />
                <div style={{ height: "400px" }}>
                    {/* 모달 컨텐츠 영역 */}
                </div>
            </div>
        </div>
    );
}
