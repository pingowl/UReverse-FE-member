import WhiteButton from "../../component/button/WhiteButton";
import styles from "./LoginSelect.module.css";
import hpointImage from '../../assets/HPoint.png';
import BlackButton from "../../component/button/BlackButton";

export default function LoginSelect() {
  return (
    <div className={styles.container}>
      {/* 메인 컨텐츠 영역 */}
      <div className={styles.content}>
        <h1 className={styles.title}>U:Reverse</h1>
        <p className={styles.description}>
          간편하게 옷장정리하고<br />
          <strong>H.Point</strong> 로 보상 받기!
        </p>
        <img src={hpointImage} alt="hpoint" className={styles.image} />
      </div>

      {/* 버튼 영역 */}
      <div className={styles.buttonArea}>
        <BlackButton
          text="로그인"
          link="/login/form"
          width="w-full"
          height="h-12"
        />
        <WhiteButton
          text="회원가입"
          link="/signup"
          width="w-full"
          height="h-12"
          className={styles.grayText}
        /> 
       
      </div>
    </div>
  );
}
