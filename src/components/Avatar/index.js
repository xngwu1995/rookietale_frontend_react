import { FrownFill } from 'antd-mobile-icons';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './index.module.scss';

/**
*
*/
const Avatar = ({
  onClick,
  avatarUrl,
  className,
}) => (
  <div
    className={classNames(style.avatarWrap, className)}
    onClick={onClick}
  >
    {avatarUrl ? <img src={avatarUrl} alt="" className={style.avatar} />
      : <FrownFill className={style.icon} />}
  </div>
);

Avatar.propTypes = {
  onClick: PropTypes.func,
  avatarUrl: PropTypes.string,
  className: PropTypes.string,
};

Avatar.defaultProps = {
  onClick: () => {},
  avatarUrl: '',
  className: '',
};

export default Avatar;
