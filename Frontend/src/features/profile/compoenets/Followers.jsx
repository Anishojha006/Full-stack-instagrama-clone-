import React, { useState } from 'react';

const Followers = ({ followers = [], followings = [], onFollow }) => {
  const [sentRequests, setSentRequests] = useState([]);
  const [activeUsername, setActiveUsername] = useState('');
  const [error, setError] = useState('');

  const handleFollow = async (username) => {
    setActiveUsername(username);
    setError('');
    try {
      await onFollow(username);
      setSentRequests((current) => [...current, username]);
    } catch (err) {
      setError(err.response?.data?.message || `Could not send a follow request to ${username}.`);
    } finally {
      setActiveUsername('');
    }
  };

  return <section className="network-card">
    <div className="network-heading">
      <div>
        <span className="eyebrow">People in your circle</span>
        <h2>Followers</h2>
      </div>
      <span className="network-count">{followers.length}</span>
    </div>
    {error && <p className="form-error" role="alert">{error}</p>}
    {followers.length ? (
      <ul className="network-list">
        {followers.map((follower) => (
          <li className="network-person" key={follower._id}>
            <span className="initial-avatar">{follower.follower?.charAt(0)?.toUpperCase() || '?'}</span>
            <span>{follower.follower}</span>
            {followings.some((following) => following.followee === follower.follower) ? (
              <span className="person-status">Following</span>
            ) : sentRequests.includes(follower.follower) ? (
              <span className="person-status">Request sent</span>
            ) : (
              <button
                type="button"
                className="text-button"
                disabled={activeUsername === follower.follower}
                onClick={() => handleFollow(follower.follower)}
              >
                {activeUsername === follower.follower ? 'Sending...' : 'Follow back'}
              </button>
            )}
          </li>
        ))}
      </ul>
    ) : <p className="list-empty">Your followers will show up here.</p>}
  </section>;
};

export default Followers;
