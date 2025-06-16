import { useState } from "react";
import styles from "./CategorySelect.module.css";
import arrowIcon from "../../../assets/icon-arrow-down.png";

export default function CategorySelect({onBack, setCategory, categoryList}) {
    const [expandedMainCategory, setExpandedMainCategory] = useState(null);

    const handleCategoryClick = (category) => {
        setCategory(category);
        onBack();
    }

    const toggleMainCategory = (mainCategoryName) => {
        setExpandedMainCategory(prev =>
            prev === mainCategoryName ? null : mainCategoryName
        );
    };

    return (
        <div className={styles.container}>
            {/* 상단 제목 영역 */}
            <div className={styles.header}>
                <button className={styles.backButton} onClick={onBack}>
                    {`<`}
                </button>
                <div className={styles.title}>카테고리 선택</div>
            </div>

            {/* 카테고리 목록 영역 */}
            <div className={styles.categoryList}>
                {categoryList.map((category, idx) => (
                    <div key={idx} className={styles.mainCategorySection}>
                        <div
                            className={styles.mainCategory}
                            onClick={() => toggleMainCategory(category.mainCategoryName)}
                        >
                            <div className={styles.mainCategoryName}>{category.mainCategoryName}</div>
                            <div className={styles.arrowIcon}>
                                <img
                                    src={arrowIcon}
                                    alt=""
                                    className={expandedMainCategory === category.mainCategoryName
                                    ? styles.arrowUp
                                    : styles.arrowDown}
                                />
                            </div>
                        </div>
                        <div 
                            className={`${styles.subCategoryWrapper} ${
                                expandedMainCategory === category.mainCategoryName
                                    ? styles.expanded
                                    : styles.collapsed
                            }`}
                        >
                            {expandedMainCategory === category.mainCategoryName &&
                                category.subCategoryResponseDtoList.map((sub) => (
                                    <div
                                        key={sub.categoryId}
                                        className={styles.subCategory}
                                        onClick={() =>
                                            handleCategoryClick({
                                                categoryId: sub.categoryId,
                                                mainCategoryName: category.mainCategoryName,
                                                subCategoryName: sub.name,
                                            })
                                        }
                                    >
                                        {sub.name}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}