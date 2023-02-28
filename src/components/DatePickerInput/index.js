// /* eslint-disable import/no-extraneous-dependencies */
// import { DatePicker } from 'antd';
// import moment from 'moment';
// import PropTypes from 'prop-types';
// import style from './index.module.css';

// const DatePickerInput = ({
//   value,
//   onChange,
// }) => {
//   const dateFormat = 'YYYY/MM/DD';
//   return (
//     <DatePicker
//       onConfirm={(val) => {
//         onChange(moment(val).format('YYYYMMDD'));
//       }}
//       className={style.birthdayInput}
//       style={{ width: '100%' }}
//       format={dateFormat}
//       placeholder="Year/Month/Day"
//       defaultValue={value}
//       value={value}
//     />
//   );
// };

// DatePickerInput.propTypes = {
//   value: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
// };

// export default DatePickerInput;
