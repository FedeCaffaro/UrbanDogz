/* eslint-disable react/prop-types */
import './Waves.module.css';

const Waves = ({ styles }) => (
  <div className="nada">
    <div className={styles.center}>
      <div className={styles.wave} />
      <div className={styles.wave} />
      <div className={styles.wave} />
      <div className={styles.wave} />
      <div className={styles.wave} />
      <div className={styles.wave} />
      <div className={styles.wave} />
      <div className={styles.wave} />
      <div className={styles.wave} />
      <div className={styles.wave} />
    </div>
  </div>
);

export default Waves;
