import { createComment } from "@services/comments";
import { useAppContext } from "@utils/context";
import { useGoTo } from "@utils/hooks";
import { timeDiff } from "@utils/index";
import { Button, message, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import style from "./index.module.scss";

/**
 *
 */

const Comment = () => {
  const [value, setValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [store] = useAppContext();
  const params = useParams();
  const go = useGoTo();
  const location = useLocation();
  const tweetDetails = location.state?.passedData;
  const onClickSubmit = () => {
    createComment({
      content: value,
      tweet_id: params.id,
    }).then(res => {
      if (res?.created_at) {
        message.success("Successfully Reply!");
      }
    });
    setIsModalOpen(false);
    go("tweets");
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    go();
  };
  return (
    <Modal
      title="Comment"
      centered
      bodyStyle={{
        height: "400px",
      }}
      width={500}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={[
        <Button
          disabled={value.length === 0}
          key="submit"
          type="primary"
          onClick={onClickSubmit}
        >
          Submit
        </Button>,
      ]}
    >
      <div className={style.container}>
        <div className={style.avatarContainer}>
          <img
            src={tweetDetails.user.avatar}
            alt="personalImg"
            className={style.avatar}
          />
        </div>
        <div className={style.contentContainer}>
          <div className={style.header}>
            <span className={style.nickname}>{tweetDetails.user.nickname}</span>
            @
            <span className={style.username}>{tweetDetails.user.username}</span>
            &nbsp;~&nbsp;
            {timeDiff(tweetDetails.created_at)}
          </div>
          <div className={style.content}>{tweetDetails.content}</div>
        </div>
        <div className={style.replyContainer}>
          <div className={style.avatarContainer}>
            <img src={store.user?.avatar} alt="" className={style.avatar} />
          </div>
          <div className={style.contentContainer}>
            <div className={style.recommit}>
              Reply to
              <span className={style.commitName}>
                @{tweetDetails.user.username}
              </span>
            </div>
          </div>
          <div className={style.reply}>
            <TextArea
              style={{
                width: "100%",
                height: "200px",
              }}
              placeholder="Tweet your reply"
              className={style.text}
              value={value}
              onChange={e => setValue(e.target.value)}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Comment;
