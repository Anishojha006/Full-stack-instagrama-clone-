import React, { useState } from 'react';

const Followings = ({ followings = [], onUnfollow }) => (
  <FollowingList followings={followings} onUnfollow={onUnfollow} />
);

const FollowingList = ({ followings, onUnfollow }) => {
  const [error, setError] = useState('');

  const handleUnfollow = async (username) => {
    setError('');
    try {
      await onUnfollow(username);
    } catch (err) {
      setError(err.response?.data?.message || `Could not unfollow ${username}.`);
    }
  };

  return <section className="network-card">
    <div className="network-heading">
      <div>
        <span className="eyebrow">Good company</span>
        <h2>Following</h2>
      </div>
      <span className="network-count">{followings.length}</span>
    </div>
    {error && <p className="form-error" role="alert">{error}</p>}
    {followings.length ? (
      <ul className="network-list">
        {followings.map((following) => (
          <li className="network-person" key={following._id}>
            <span className="initial-avatar">{following.followee?.charAt(0)?.toUpperCase() || '?'}</span>
            <span>{following.followee}</span>
            <button type="button" className="text-button" onClick={() => handleUnfollow(following.followee)}>
              Unfollow
            </button>
          </li>
        ))}
      </ul>
    ) : <p className="list-empty">People you follow will appear here.</p>}
  </section>;
};

export default Followings;
