import styles from './TrustedProcessSection.module.css';

const ecoFactors = [
  {
    title: '섬유 폐기물 감축',
    desc: '매년 수많은 옷들이 버려지고 있어요. U:REVERSE는 이러한 의류를 수거하고 재활용함으로써 연간 수천 톤의 섬유 폐기물 발생을 효과적으로 줄이고 있어요.',
  },
  {
    title: '탄소 배출 감소',
    desc: '옷 한 벌을 새로 생산할 때 발생하는 탄소는 생각보다 큽니다. U:REVERSE는 기존 자원을 활용하여 신제품 대비 약 70% 이상의 탄소를 절감하고 있어요.',
  },
  {
    title: '지속 가능한 소비',
    desc: '무분별한 소비보다 더 중요한 건, 지금 가진 것을 잘 활용하는 것이에요. U:REVERSE는 재사용을 통해 환경에 부담을 덜 주는 새로운 소비 문화를 만들어가고 있어요.',
  },
];

const TrustedProcessSection = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>U:REVERSE는 왜 환경에 도움이 될까요?</h2>
      <div className={styles.cards}>
        {ecoFactors.map(({ title, desc }, i) => (
          <div className={styles.card} key={i}>
            <h3 className={styles.cardTitle}>{title}</h3>
            <p className={styles.cardDesc}>{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustedProcessSection;
