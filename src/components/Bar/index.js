import { useState } from 'react';
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
}) => {
  const [activeKey, setactiveKey] = useState();
  const nav = useNavigate();
  const [liked, setLiked] = useState(false);
  const onChangeTabItem = (key) => {
    setactiveKey(key);
    if (key === BAR_KEYS.STAR) {
      console.log('liked', liked);
      if (liked) {
        cancelLike({
          content_type: type,
          object_id: id,
        }).then((res) => {
          if (res?.success) {
            window.alert('Success cancel');
            setLiked(false);
            return;
          }
          window.alert('Failed');
        });
        return;
      }
      likes({
        content_type: type,
        object_id: id,
      }).then((res) => {
        if (res?.success) {
          window.alert('Success');
          setLiked(true);
          return;
        }
        window.alert('Failed');
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
};
Bar.defaultProps = {
  id: -1,
  onlyStar: false,
  commentsCount: 0,
  likesCount: 0,
  type: '',
};
export default Bar;
