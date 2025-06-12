import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import styles from "./BottomSheetModal.module.css";

const BottomSheetModal = forwardRef(({ onClose, children }, ref) => {
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

    // ref 를 통해 외부에서 triggerClose 접근 가능하게
    useImperativeHandle(ref, () => ({
        triggerClose
    }));

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
                style={offsetY > 0 ? { transform: `translateY(${offsetY}px)` } : undefined}
            >
                <div
                    className={styles.dragHandleArea}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}

                    // 드래그하지 않는 상태일 때는 className으로 애니메이션 적용, 드래그 중일 때만 style로 수동 위치 조절
                    onMouseDown={(e) => {
                        startY.current = e.clientY;
                        dragging.current = true;
                        setAnimate(false);
                    }}
                >
                    <div className={styles.dragHandle}></div>
                </div>
                <div className={styles.modalContent}>
                    {children}
                </div>
            </div>
        </div>
    );
});

export default BottomSheetModal;