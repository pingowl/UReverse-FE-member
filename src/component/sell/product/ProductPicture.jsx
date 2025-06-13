import { IoCloseCircle } from 'react-icons/io5';
import styles from './ProductPicture.module.css';

export default function ProductPicture({ pictureList, setPictureList }) {

    const handleRemove = (index) => {
        setPictureList(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className={styles.wrapper}>
            {pictureList.map((item, index) => (
                <div key={index} className={styles.imageBox}>
                    <img src={item.preview} alt={`사진 ${index + 1}`} />
                    <button
                        className={styles.deleteButton}
                        onClick={() => handleRemove(index)}
                        type="button"
                    >
                        <IoCloseCircle size={20} />
                    </button>
                </div>
            ))}
        </div>
    );
}
