import { useGoTo } from "@utils/hooks";
import { message } from "antd";
import { useState } from "react";
import { menuItems } from "@utils/constants";
import Cookies from "js-cookie";
import { useAppContext } from "@utils/context";
import style from "./index.module.scss";

const Nav = () => {
  const [current, setCurrent] = useState("tweets");
  const [, setStore] = useAppContext();
  const go = useGoTo();

  const handleMenuItemClick = key => {
    setCurrent(key);
    go(key);
  };

  const handleLogout = () => {
    Cookies.set("userId", "");
    Cookies.set("access", "");
    setStore("clear all");
    message.success("Successfully Log Out");
    go("login");
  };

  return (
    <div className={style.navContainer}>
      <ul className={style.navList}>
        {menuItems.map(item => (
          <li key={item.key}>
            <button
              type="button"
              className={`${style.navListItem} ${
                current === item.key ? style.active : ""
              }`}
              onClick={() => handleMenuItemClick(item.key)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={style.post}
        onClick={() => handleMenuItemClick("post")}
      >
        Post Revenue
      </button>
      <div className={style.logoutWrapper}>
        <button type="button" className={style.logout} onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Nav;
