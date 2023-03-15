import Bar from '@components/Bar';
import { OBJECT_KEYS } from '@components/Bar/constants';
import ImageCard from '@components/ImageCard';
import { useGoTo } from '@utils/hooks';
import moment from 'moment';
import PropTypes from 'prop-types';
import style from './index.module.scss';

/**
*
*/
const TweetCard = ({
  dataSource,
}) => {
  const go = useGoTo();
  return (
    <div className={style.container}>
      <div className={style.avatarContainer}>
        <img src={dataSource.user.avatar_url} alt="" className={style.avatar} />
      </div>
      <div className={style.contentContainer}>
        <div className={style.header}>
          <span className={style.nickname}>
            {dataSource.user.nickname}
          </span>
          @
          <span className={style.username}>
            {dataSource.user.username}
          </span>
          &nbsp;~&nbsp;
          {`${moment(dataSource.created_at).format('mm')}minute`}
        </div>
        <div className={style.content} onClick={() => go('tweet', { id: dataSource.id })}>
          {dataSource.content}
        </div>
        <div className={style.photo}>
          {dataSource.photo_urls.length > 0
            && <ImageCard imgs={dataSource.photo_urls} />}
        </div>
        <div className={style.bar}>
          <Bar
            commentsCount={dataSource.comments_count}
            likesCount={dataSource.likes_count}
            id={dataSource.id}
            type={OBJECT_KEYS.TWEET}
            hasLiked={dataSource.has_liked}
          />
        </div>
      </div>
    </div>
  );
};

TweetCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  dataSource: PropTypes.object.isRequired,
};
export default TweetCard;
