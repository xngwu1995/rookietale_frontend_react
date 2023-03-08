import { useState } from 'react';
import { TabBar } from 'antd-mobile';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import cycleSvg from '@assets/cycle.svg';
import starSvg from '@assets/star.svg';
import upSvg from '@assets/up.svg';
import msgSvg from '@assets/msg.svg';
import style from './index.module.scss';

const getBars = ({
  commentsCount,
  likesCount,
  nav,
  id,
}) => [
  {
    key: 'msg',
    icon: (
      <div onClick={() => nav(`/comments/${id}`)}>
        <img className={style.icon} src={msgSvg} alt="" />
        {commentsCount > 0 && <span className={style.count}>{commentsCount}</span>}
      </div>),
  },
  {
    key: 'cycle',
    icon: <img className={style.icon} src={cycleSvg} alt="" />,
  },
  {
    key: 'star',
    icon: (
      <div>
        <img className={style.icon} src={starSvg} alt="" />
        {likesCount > 0 && <span className={style.count}>{likesCount}</span>}
      </div>),
  },
  {
    key: 'up',
    icon: <img className={style.icon} src={upSvg} alt="" />,
  },
];
/**
*
*/
const Bar = ({
  likesCount,
  commentsCount,
  id,
}) => {
  const [activeKey, setactiveKey] = useState();
  const nav = useNavigate();
  const onChangeTabItem = (key) => {
    setactiveKey(key);
  };
  return (
    <div className={style.container}>
      <TabBar activeKey={activeKey} onChange={onChangeTabItem}>
        {getBars({
          likesCount,
          commentsCount,
          nav,
          id,
        }).map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} />
        ))}
      </TabBar>
    </div>
  );
};

Bar.propTypes = {
  commentsCount: PropTypes.number.isRequired,
  likesCount: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default Bar;
