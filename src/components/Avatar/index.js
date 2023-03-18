import PropTypes from 'prop-types';
import style from './index.module.scss';

/**
*
*/
const Avatar = ({
  onClick,
  avatarUrl,
}) => (
  <div className={style.avatarContainer}>
    <button
      type="button"
      className={style.avatarButton}
      onClick={onClick}
      aria-label="Avatar"
    >
      <img src={avatarUrl} alt="Profile" className={style.avatar} />
    </button>
  </div>
);

Avatar.propTypes = {
  onClick: PropTypes.func,
  avatarUrl: PropTypes.string,
};

Avatar.defaultProps = {
  onClick: () => {},
  avatarUrl: '',
};

export default Avatar;
