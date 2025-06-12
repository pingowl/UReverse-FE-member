import styles from './BrandSelect.module.css';

export default function BrandSelect({onBack, setBrand, brandList}) {

    const handleBrandClick = (brand) => {
        setBrand(brand);
        onBack();
    }

    return (
        <div className={styles.container}>
            {/* 상단 제목 영역 */}
            <div className={styles.header}>
                <button className={styles.backButton} onClick={onBack}>
                    {`<`}
                </button>
                <div className={styles.title}>브랜드 선택</div>
            </div>

            {/* 브랜드 리스트 영역 */}
            <div className={styles.grid}>
                {brandList[0].map((brand) => (
                    <div
                        key={brand.brand_id}
                        className={styles.brandBox}
                        onClick={() => handleBrandClick(brand)}
                    >
                        <img 
                            src={brand.brandLogo}
                            alt=""
                            className={styles.brandLogo}/>
                        <div className={styles.brandInfo}>
                            <div className={styles.brandNameKr}>{brand.name}</div>
                            <div className={styles.brandNameEn}>{brand.name_en}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}