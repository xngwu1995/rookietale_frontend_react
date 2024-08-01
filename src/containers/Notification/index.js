import React from "react";
import "./index.css";
import { useGoTo } from "@utils/hooks";
import { useAppContext } from "@utils/context";

function Notification({ onClose }) {
  const [store, setStore] = useAppContext();
  const go = useGoTo();

  const handleLogOut = () => {
    go("login");
    if (store.user) {
      setStore({ ...store, user: null });
    }
    onClose();
  };

  return (
    <div className="notification">
      <div className="notification-content">
        <h2>Session Expired, Please re-login</h2>
        <button onClick={handleLogOut}>Logout</button>
      </div>
    </div>
  );
}

export default Notification;
