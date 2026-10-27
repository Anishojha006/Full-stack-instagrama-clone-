import React from 'react';

const Userinfo = ({ user, followers = [], followings = [] }) => {
  if (!user) {
    return <p className="list-empty">Loading your profile...</p>;
  }

  return (
    <section className="user-info">
      <div className="img-name">
        <div className="img">
          {user.profileImage
            ? <img src={user.profileImage} alt={`${user.username} profile`} />
            : <span className="avatar-fallback">{user.username?.charAt(0)?.toUpperCase() || '?'}</span>}
        </div>
        <div className="profile-identity">
          <span className="eyebrow">Your space</span>
          <h1>{user.username}</h1>
          <p>{user.email}</p>
        </div>
      </div>
      <div className="follower-following-number">
        <div><strong>{followers.length}</strong><span>Followers</span></div>
        <div><strong>{followings.length}</strong><span>Following</span></div>
      </div>
    </section>
  );
};

export default Userinfo;
