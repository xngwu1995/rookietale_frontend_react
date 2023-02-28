import style from './index.module.css';
import datelogo from '../../assets/date.svg';

export default () => (
  <div className={style.birthdayInput}>
    <div className={style.birthTitleItem}>Date of birth</div>
    <div>
      <span className={style.birthDatePlaceholder}>Year/Month/Day</span>
      <img className={style.dateIcon} src={datelogo} alt="date" />
    </div>
  </div>
);
