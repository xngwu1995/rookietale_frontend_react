// import IconButton from '@components/IconButton';
import { useGoTo } from '@utils/hooks';
import { Button, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { createTweet } from '@services/tweet';
import ImageUpload from '@components/ImageUpload';
import ImagePreview from '@components/ImagePreview';
import style from './index.module.scss';

const defaultTweet = {
  id: 6,
  user: {
    id: 1,
    username: 'admin',
    nickname: 'IU',
    avatar_url: 'https://img.shoufaw.com/wp-content/uploads/2020/10/aEjURn.jpg',
    acvatar_url_0: 'https://pgw.udn.com.tw/gw/photo.php?u=https://uc.udn.com.tw/photo/2021/08/12/realtime/13315182.jpg',
  },
};
/**
*
*/
const CreateTweet = () => {
  const [value, setValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [imgs, setImgs] = useState([]);
  const go = useGoTo();
  const onClickSubmit = () => {
    createTweet({
      value,
      files: Object.values(imgs),
    }).then((res) => {
      if (res?.success) {
        window.alert('Successfully Post!');
        return;
      }
      // eslint-disable-next-line no-alert
      window.alert('Ops, you can not post');
    });
    setIsModalOpen(false);
    go();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    go();
  };

  const onChangeFile = (v) => {
    if (v && (Object.keys(imgs).length + Object.keys(v).length < 5)) {
      setImgs((oldV) => ({
        ...oldV,
        ...v,
      }));
      return;
    }
    window.alert('Four pictures only.');
  };
  const handleDelImg = (index) => {
    const key = Object.keys(imgs).find((item, idx) => idx === index);
    setImgs((item) => {
      const newItem = { ...item };
      delete newItem[key];
      return newItem;
    });
  };
  return (
    <Modal
      open={isModalOpen}
      bodyStyle={{
        height: 500,
      }}
      onCancel={handleCancel}
      footer={[
        <Button disabled={value.length === 0 && Object.keys(imgs).length === 0} type="primary" onClick={onClickSubmit}>
          Post
        </Button>,
      ]}
    >
      <div className={style.container}>
        <div className={style.avatarContainer}>
          <img src={defaultTweet.user.acvatar_url_0} alt="personalImg" className={style.avatar} />
        </div>
        <div className={style.content}>
          <TextArea
            placeholder="What's happening"
            style={{
              height: 150,
            }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <ImagePreview imgs={Object.values(imgs)} handleDelImg={handleDelImg} />
          <div className={style.button}>
            <ImageUpload onChange={onChangeFile} />
          </div>
        </div>

      </div>
    </Modal>

  );
};

export default CreateTweet;
