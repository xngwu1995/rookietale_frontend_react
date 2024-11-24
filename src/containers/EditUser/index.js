import { useState } from "react";
import { Toast } from "antd-mobile";
import { useAppContext } from "@utils/context";
import { CameraOutline } from "antd-mobile-icons";
import { fileByBase64 } from "@utils/";
import { Button, Input, Modal, Form, DatePicker, Radio } from "antd";
import { editUser } from "@services/register";
import { useGoTo } from "@utils/hooks";
import style from "./index.module.scss";
import moment from "moment";

/**
 *
 */
const EditUser = () => {
  const [avatar, setAvatar] = useState("");
  const [file, setFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [store, setStore] = useAppContext();
  const go = useGoTo();
  const [form] = Form.useForm();

  const onFileChange = e => {
    const { files } = e.target;
    const fls = Object.values(files);
    const fl = fls[0];
    setFile(fl);
    fileByBase64(fl).then(res => {
      setAvatar(res);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    go();
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const params = {};

      if (values.nickname) {
        params.nickname = values.nickname;
      }
      if (values.dob) {
        params.dob = moment(values.dob).format("YYYY-MM-DD");
      }
      if (values.gender) {
        params.gender = values.gender;
      }
      if (file) {
        params.avatar = file;
      }

      if (Object.keys(params).length > 0) {
        const res = await editUser(store.user.id, { ...params });
        if (res.nickname || res.avatar || res.dob || res.gender) {
          Toast.show("保存成功");
          const newUser = { ...store.user, ...res };
          setStore({ user: newUser });
          setIsModalOpen(false);
          go("tweets");
        }
      } else {
        Toast.show("请更新任何信息来保存修改");
      }
    } catch (error) {
      Toast.show("请检查输入是否正确");
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
          <input
            type="file"
            className={style.upFile}
            onChange={onFileChange}
            accept="image/png.image/jpg"
          />
          <img
            className={style.avatar}
            src={avatar || store.user.avatar}
            alt=""
          />
        </div>
        <div className={style.content}>
          <Form form={form}>
            <Form.Item name="nickname">
              <Input
                label="Nickname"
                placeholder="Nickname"
                value={store.nickname}
              />
            </Form.Item>
            <Form.Item
              name="dob"
              label="Date of Birth"
              rules={[
                { required: true, message: "Please select your date of birth" },
              ]}
            >
              <DatePicker
                format="YYYY/MM/DD"
                placeholder="Select Date of Birth"
              />
            </Form.Item>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true, message: "Please select your gender" }]}
            >
              <Radio.Group>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default EditUser;
