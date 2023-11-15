// import IconButton from '@components/IconButton';
import { useGoTo } from '@utils/hooks';
import { Button, message, Modal } from 'antd';
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
        message.success('Successfully Post!');
        setIsModalOpen(false);
        go('/');
        window.location.reload();
      }
    });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    go();
  };
  console.log('store', store);

  const onChangeFile = (v) => {
    if (v && (Object.keys(imgs).length + Object.keys(v).length) < 5) {
      const newV = {};
      const newFiles = [...files];

      Object.keys(v).forEach((key) => {
        newV[key] = v[key].content;
        newFiles.push(v[key].file);
      });

      setFiles(newFiles);

      setImgs((oldV) => ({
        ...oldV,
        ...newV,
      }));
      return;
    }
    message.error('Four Pictures Only.');
  };

  const handleDelImg = (index) => {
    const key = Object.keys(imgs).find((item, idx) => idx === index);
    setImgs((item) => {
      const newItem = { ...item };
      delete newItem[key];
      return newItem;
    });

    setFiles((oldFiles) => {
      const newFiles = oldFiles.filter((_, i) => i !== index);
      return newFiles;
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
          <img src={store.user.avatar} alt="" className={style.avatar} />
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
