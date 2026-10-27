import React from 'react';

const Post = ({ user, post, handlelike, handleunlike }) => {
  return (
    <article className="post">
      <div className="user">
        <div className="image-warapper">
          {user?.profileImage
            ? <img src={user.profileImage} alt="" />
            : <span className="avatar-fallback">{user?.username?.charAt(0)?.toUpperCase() || '?'}</span>}
        </div>
        <div className="post-author">
          <p>{user?.username || 'Unknown user'}</p>
          <span>Shared a moment</span>
        </div>
      </div>

      <img src={post.imgUrl} alt={post.caption || `A moment shared by ${user?.username || 'a user'}`} className="post-image" />

      <div className="icons">
        <div className="left">
          <button
            type="button"
            className={post.isLiked ? 'like-button liked' : 'like-button'}
            aria-label={post.isLiked ? 'Unlike post' : 'Like post'}
            onClick={() => (post.isLiked ? handleunlike(post._id) : handlelike(post._id))}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="bottom">
        <p className="caption"><strong>{user?.username || 'Unknown user'}</strong> {post.caption}</p>
      </div>
    </article>
  );
};

export default Post;
