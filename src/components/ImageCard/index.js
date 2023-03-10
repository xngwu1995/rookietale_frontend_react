/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
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

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [useBrowserFullscreen, setUseBrowserFullscreen] = useState(false);
  const images = imgs.map((img) => ({
    original: img,
    thumbnail: img,
  }));
  useEffect(() => {
    if (isGalleryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  });
  const openGallery = (index) => {
    setUseBrowserFullscreen(true);
    setSelectedImageIndex(index);
    setIsGalleryOpen(true);
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
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
            onClick={() => openGallery(index)}
          />
        ))}
      </div>
      {isGalleryOpen && (
        <div className={style.modal} onClick={closeGallery}>
          <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
            <ImageGallery
              fullScreen
              items={images}
              showIndex
              showBullets
              showThumbnails
              startIndex={selectedImageIndex}
              onClose={closeGallery}
              onSlide={(index) => setSelectedImageIndex(index)}
              useBrowserFullscreen={useBrowserFullscreen}
            />
          </div>
        </div>
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
