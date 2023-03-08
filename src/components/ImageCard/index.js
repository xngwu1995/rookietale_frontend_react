/* eslint-disable import/no-extraneous-dependencies */
import { Image } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import style from './index.module.scss';

/**
*
*/
const ImageCard = ({
  imgs,
}) => {
  const getWarpper = () => {
    switch (imgs.length) {
      case 1:
        return style.wrapper1;
      case 2:
        return style.wrapper2;
      case 3:
        return style.wrapper3;
      case 4:
        return style.wrapper4;
      default:
        return style.wrapper;
    }
  };
  return (
    <div className={style.container}>
      <div className={classNames(style.wrapper, getWarpper())}>
        {imgs.map((img, index) => (
          <Image
            rootClassName={classNames(style.img, `img${index}`)}
            style={{ height: '100%' }}
            key={classNames(img, index)}
            src={img}
            alt=""
          />
        ))}
      </div>
    </div>
  );
};

ImageCard.propTypes = {
  imgs: PropTypes.arrayOf(PropTypes.string),
};

ImageCard.defaultProps = {
  imgs: [],
};

export default ImageCard;
