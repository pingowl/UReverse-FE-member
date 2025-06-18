import styles from './HowItWorksSection.module.css';

const steps = [
  {
    step: '01',
    title: '사진 업로드',
    desc: '앱에서 중고 물품 사진을 업로드해요.',
    hint: '예: 옷 전체, 라벨, 오염 부위 등'
  },
  {
    step: '02',
    title: 'AI 1차 검수',
    desc: '사진 기반으로 AI가 1차 검수해요.',
    hint: '얼룩, 찢김, 오염 등을 자동 인식해요'
  },
  {
    step: '03',
    title: '백화점 2차 검수',
    desc: '전문가가 업로드된 사진을 바탕으로 상태를 확인해요.',
    hint: '누적된 경험을 바탕으로 사진에서도 핵심을 파악해요'
  },
  {
    step: '04',
    title: '포인트 지급',
    desc: '검수 통과 후 수거가 완료되면 포인트가 지급돼요.',
    hint: '수거까지 완료되면 보통 2~3일 내 지급돼요'
  },
];

const HowItWorksSection = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>U:REVERSE는 이렇게 진행돼요</h2>
      <div className={styles.steps}>
        {steps.map(({ step, title, desc, hint }) => (
          <div className={styles.stepBox} key={step}>
            <div className={styles.stepNumber}>{step}</div>
            <div className={styles.stepTitle}>{title}</div>
            <div className={styles.stepDesc}>{desc}</div>
            <div className={styles.stepHint}>{hint}</div>
          </div>
        ))}
      </div>
      <div className={styles.totalTime}>⏱ 평균 소요 시간: 2~3일</div>
    </section>
  );
};

export default HowItWorksSection;
