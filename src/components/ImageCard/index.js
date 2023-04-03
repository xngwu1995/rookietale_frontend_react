import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PhotoProvider, PhotoSlider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import style from './index.module.scss';

const ImageCard = ({ imgs }) => {
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
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
          <button
            key={classNames(img, index)}
            type="button"
            onClick={() => handleClick(index)}
          >
            <img key={classNames(img, index)} className={classNames(style.img, `img${index}`)} src={img} alt="" />
          </button>
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
