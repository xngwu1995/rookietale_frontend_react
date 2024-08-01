import { CloseOutlined } from "@ant-design/icons";
import { useAppContext } from "@utils/context";
// import { useCurMenu } from '@utils/hooks';
import logo from "../../assets/logo.svg";
import style from "./index.module.scss";

const HeaderTwitter = () => {
  const [store] = useAppContext();
  return (
    <div className={style.header}>
      {store.closeHeaderHandler && (
        <CloseOutlined
          className={style.closeIcon}
          onClick={store.closeHeaderHandler}
        />
      )}
      <img src={logo} alt="RookieTale" className={style.logo} />
    </div>
  );
};

export default HeaderTwitter;
