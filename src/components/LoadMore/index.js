import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import style from './index.module.scss';

const TabContentWithInfiniteScroll = ({ hasMore, onLoadMore }) => {
  const handleScroll = useCallback(() => {
    if (!hasMore) {
      return;
    }

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= docHeight) {
      onLoadMore();
    }
  }, [hasMore, onLoadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className={style.loadingContainer}>
      {hasMore && <Spin className={style.loadingSpinner} />}
    </div>
  );
};

TabContentWithInfiniteScroll.propTypes = {
  hasMore: PropTypes.bool.isRequired,
  onLoadMore: PropTypes.func.isRequired,
};

export default TabContentWithInfiniteScroll;
