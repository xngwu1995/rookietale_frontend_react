import { CloseOutlined } from "@ant-design/icons";
import classNames from "classnames";
import PropTypes from "prop-types";
import style from "./index.module.scss";

/**
 *
 */
const ImagePreview = ({ imgs, handleDelImg }) => {
  if (!imgs || imgs.length === 0) return null;
  const getWrapper = () => {
    switch (imgs.length) {
      case 1:
        return style.wrapper1;
      case 2:
        return style.wrapper2;
      case 3:
        return style.wrapper3;
      case 4:
        return style.wrapper4;
      default:
        return style.wrapper;
    }
  };
  return (
    <div className={style.container}>
      <div className={classNames(style.wrapper, getWrapper())}>
        {imgs.map((img, index) => (
          <div
            key={classNames(img, index)}
            className={classNames(style.img, `img${index}`)}
          >
            <CloseOutlined
              className={style.close}
              onClick={() => handleDelImg(index)}
            />
            <img className={style.itemImg} src={img} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

ImagePreview.propTypes = {
  imgs: PropTypes.arrayOf(PropTypes.string),
  handleDelImg: PropTypes.func.isRequired,
};

ImagePreview.defaultProps = {
  imgs: [],
};

export default ImagePreview;
