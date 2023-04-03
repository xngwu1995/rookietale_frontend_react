import { useState } from 'react';
import { Toast } from 'antd-mobile';
import { useAppContext } from '@utils/context';
import { CameraOutline } from 'antd-mobile-icons';
import { fileByBase64 } from '@utils/';
import {
  Button, Input, Modal, Form,
} from 'antd';
import { editUser } from '@services/register';
import { useGoTo } from '@utils/hooks';
import style from './index.module.scss';

/**
*
*/
const EditUser = () => {
  const [avatar, setAvatar] = useState('');
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [store, setStore] = useAppContext();
  const go = useGoTo();
  const [form] = Form.useForm();

  const onFileChange = (e) => {
    const { files } = e.target;
    const fls = Object.values(files);
    const fl = fls[0];
    setFile(fl);
    fileByBase64(fl).then((res) => {
      setAvatar(res);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    go();
  };

  const handleSave = async () => {
    const values = await form.validateFields();
    const params = {};
    if (values) {
      const newNickname = values.nickname;
      params.nickname = newNickname;
    }
    if (file) {
      params.avatar = file;
    }
    if (params) {
      const res = await editUser(store.user.id, { ...params });
      if (res.nickname || res.avatar) {
        Toast.show('保存成功');
        const newUser = { ...store.user, ...res };
        setStore({ user: newUser });
        setIsModalOpen(false);
        go('tweets');
      }
    } else {
      Toast.show('更新编辑全名或者重新上传用户头像');
    }
  };

  return (
    <Modal
      open={isModalOpen}
      bodyStyle={{
        height: 500,
      }}
      onCancel={handleCancel}
      footer={[
        <Button type="primary" onClick={handleSave}>
          Post
        </Button>,
      ]}
    >
      <div className={style.container}>
        <div className={style.header} />
        <div className={style.avatarWrap}>
          <div className={style.photoIcon}>
            <CameraOutline />
          </div>
          <input type="file" className={style.upFile} onChange={onFileChange} accept="image/png.image/jpg" />
          <img className={style.avatar} src={avatar || store.user.avatar_url} alt="" />
        </div>
        <div className={style.content}>
          <Form
            form={form}
          >
            <Form.Item
              name="nickname"
            >
              <Input label="Nickname" placeholder="Nickname" value={store.nickname} />
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default EditUser;
