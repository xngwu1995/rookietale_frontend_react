import PropTypes from 'prop-types';
import Avatar from '@components/Avatar';
import styles from './index.module.scss';

const UserList = ({
  users,
  userIds,
  onAvatarClick,
  onToggleFollowing,
  loading,
  showFollowButton,
}) => (
  <ul>
    {users
      && users.map((user) => {
        const currentUser = user.user;
        const userId = currentUser.id;
        const isFollowing = userIds.includes(userId);

        return (
          <li key={currentUser.id} className={styles.userListItem}>
            <Avatar
              avatarUrl={currentUser.avatar}
              size={40}
              onClick={onAvatarClick}
            />
            <div className={styles.userListInfo}>
              <div className={styles.userListNickname}>{currentUser.nickname}</div>
              <div>
                @
                {currentUser.username}
              </div>
            </div>
            {showFollowButton && (
              <button
                type="button"
                className={styles.followButton}
                onClick={() => !loading && onToggleFollowing(userId)}
              >
                {isFollowing ? 'Unfollow' : 'Follow'}
              </button>
            )}
          </li>
        );
      })}
  </ul>
);

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        avatar: PropTypes.string,
        nickname: PropTypes.string,
        username: PropTypes.string.isRequired,
      }),
    }),
  ),
  userIds: PropTypes.arrayOf(PropTypes.number),
  onAvatarClick: PropTypes.func,
  onToggleFollowing: PropTypes.func,
  loading: PropTypes.bool,
  showFollowButton: PropTypes.bool,
};

UserList.defaultProps = {
  users: [],
  userIds: [],
  onAvatarClick: null,
  onToggleFollowing: null,
  loading: false,
  showFollowButton: false,
};

export default UserList;
