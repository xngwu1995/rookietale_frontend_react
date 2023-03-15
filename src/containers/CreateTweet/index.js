// import IconButton from '@components/IconButton';
import { useGoTo } from '@utils/hooks';
import { Button, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { createTweet } from '@services/tweet';
import ImageUpload from '@components/ImageUpload';
import ImagePreview from '@components/ImagePreview';
import { useAppContext } from '@utils/context';
import style from './index.module.scss';

/**
*
*/
const CreateTweet = () => {
  const [value, setValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [imgs, setImgs] = useState([]);
  const [files, setFiles] = useState([]);
  const [store] = useAppContext();
  const go = useGoTo();

  const onClickSubmit = () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('content', value);
    createTweet(formData).then((res) => {
      if (res) {
        window.alert('Successfully Post!');
        setIsModalOpen(false);
        go();
        return;
      }
      // eslint-disable-next-line no-alert
      window.alert('Ops, you can not post');
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    go();
  };

  const onChangeFile = (v) => {
    if (v && Object.keys(v).length < 5) {
      const newV = {};
      Object.keys(v).forEach((key) => {
        newV[key] = v[key].content;
      });
      setFiles(Object.values(v).map((item) => item.file));
      setImgs((oldV) => ({
        ...oldV,
        ...newV,
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
          <img src={store.user?.avatar_url} alt="" className={style.avatar} />
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
