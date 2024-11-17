import React from "react";
import { Alert } from "antd";

const Notification = ({ message }) => {
  return <Alert message={message} type="info" />;
};

export default Notification;
