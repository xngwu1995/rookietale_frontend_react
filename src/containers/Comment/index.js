/* eslint-disable no-alert */
import { createComment } from '@services/comments';
import { useGoTo } from '@utils/hooks';
import { Button, message, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import style from './index.module.scss';

/**
*
*/
const defaultTweet = {
  id: 6,
  user: {
    id: 1,
    username: 'admin',
    nickname: 'IU',
    avatar_url: 'https://img.shoufaw.com/wp-content/uploads/2020/10/aEjURn.jpg',
    acvatar_url_0: 'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
  },
  comments: [
    {
      id: 10,
      tweet_id: 1,
      user: {
        id: 2,
        username: 'admin',
        nickname: 'IUShadow',
        avatar_url: 'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
      },
      created_at: '2022-02-15T04:38:34.078407Z',
      content: 'I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test',
      likes_count: 0,
      has_liked: false,
    },
  ],
  created_at: '2022-02-15T04:38:34.078407Z',
  content: 'I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a testI wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a testI wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test, I wanna make a test',
  comments_count: 10,
  likes_count: 10,
  has_liked: true,
  photo_urls: [
    'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
    'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
    'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
    'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
  ],
};

const Comment = () => {
  const [value, setValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const params = useParams();
  const go = useGoTo();
  const onClickSubmit = () => {
    createComment({
      content: value,
      tweet_id: params.id,
    }).then((res) => {
      if (res?.success) {
        message.success('Successfully Reply!');
      }
    });
    setIsModalOpen(false);
    go();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    go();
  };
  return (
    <Modal
      open={isModalOpen}
      bodyStyle={{
        height: '100%',
      }}
      onCancel={handleCancel}
      footer={[
        <Button disabled={value.length === 0} key="submit" type="primary" onClick={onClickSubmit}>
          Submit
        </Button>,
      ]}
    >
      <div className={style.container}>
        <div className={style.avatarContainer}>
          <img src={defaultTweet.user.avatar_url} alt="personalImg" className={style.avatar} />
        </div>
        <div className={style.contentContainer}>
          <div className={style.header}>
            <span className={style.nickname}>
              {defaultTweet.user.nickname}
            </span>
            @
            <span className={style.username}>
              {defaultTweet.user.username}
            </span>
            &nbsp;~&nbsp;
            {`${moment(defaultTweet.created_at).format('mm')}minute`}
          </div>
          <div className={style.content}>
            {defaultTweet.content}
          </div>
          <div className={style.recommit}>
            Reply to
            <span className={style.commitName}>
              @
              {defaultTweet.user.username}
            </span>
          </div>
        </div>
        <div>
          <div className={style.avatarContainer}>
            <img src={defaultTweet.user.acvatar_url_0} alt="personalImg" className={style.avatar} />
          </div>
          <TextArea
            placeholder="Tweet your reply"
            style={{
              width: '100%',
            }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};

export default Comment;
