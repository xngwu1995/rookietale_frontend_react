import { useState } from 'react';
import { message } from 'antd';
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { cancelLike, likes } from '@services/comments';
import { BAR_KEYS, getBars, OBJECT_KEYS } from './constants';
import style from './index.module.scss';

/**
*
*/
const Bar = ({
  likesCount,
  commentsCount,
  id,
  onlyStar,
  type,
  hasLiked,
}) => {
  const [activeKey, setactiveKey] = useState();
  const nav = useNavigate();
  const [liked, setLiked] = useState(hasLiked);
  const onChangeTabItem = (key) => {
    setactiveKey(key);
    if (key === BAR_KEYS.STAR) {
      if (liked) {
        cancelLike({
          content_type: type,
          object_id: id,
        }).then((res) => {
          if (res) {
            message.success('Successfully Cancelled');
            setLiked(false);
          }
        });
        return;
      }
      likes({
        content_type: type,
        object_id: id,
      }).then((res) => {
        if (res) {
          message.success('Success');
          setLiked(true);
        }
      });
    }
  };
  return (
    <div className={style.container}>
      <TabBar activeKey={activeKey} onChange={onChangeTabItem}>
        {getBars({
          likesCount,
          commentsCount,
          onlyStar,
          nav,
          id,
          liked,
        }).map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} />
        ))}
      </TabBar>
    </div>
  );
};

Bar.propTypes = {
  commentsCount: PropTypes.number,
  likesCount: PropTypes.number,
  id: PropTypes.number,
  onlyStar: PropTypes.bool,
  type: PropTypes.oneOf([OBJECT_KEYS.COMMENT, OBJECT_KEYS.TWEET]),
  hasLiked: PropTypes.bool.isRequired,
};
Bar.defaultProps = {
  id: -1,
  onlyStar: false,
  commentsCount: 0,
  likesCount: 0,
  type: '',
};
export default Bar;
