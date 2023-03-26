import moment from 'moment';

export const fileByBase64 = (file) => new Promise((r) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = (e) => {
    r(e.target.result);
  };
});

/**
 * Return the time difference
 */
export const timeDiff = (time) => {
  const hours = moment().diff(time, 'hours');
  if (hours > 23) {
    return moment(time).format('MM/DD/YYYY');
  }
  if (hours > 0) {
    return `${hours} hours`;
  }
  const minutes = moment().diff(time, 'minutes');
  return `${minutes || 1} minutes`;
};
