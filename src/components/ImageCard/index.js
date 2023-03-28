/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PhotoProvider, PhotoSlider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import style from './index.module.scss';

const ImageCard = ({ imgs }) => {
  const getWrapper = () => {
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

  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div className={style.container}>
      <div className={classNames(style.wrapper, getWrapper())}>
        {imgs.map((img, index) => (
          <img
            key={index}
            className={classNames(style.img, `img${index}`)}
            src={img}
            alt=""
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      {visible && (
        <PhotoProvider>
          <PhotoSlider
            images={imgs.map((img) => ({ src: img }))}
            visible={visible}
            onClose={handleClose}
            activeIndex={activeIndex}
          />
        </PhotoProvider>
      )}
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
