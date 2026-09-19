import React, { useState, useRef } from 'react';
import '../style/createPost.scss';
import { usePosts } from '../hooks/usePosts.js';
import { useNavigate } from 'react-router';

const CreatePost = () => {
  const [caption, setcaption] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const postimageinpiutFieldRef = useRef(null);
  const { loading, handlecreatePost } = usePosts();
  const navigate = useNavigate();

  const handleImageChange = () => {
    const file = postimageinpiutFieldRef.current?.files?.[0];
    setSelectedImage(file ? file.name : null);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const file = postimageinpiutFieldRef.current?.files?.[0];

    if (!file) {
      alert('Please select an image before publishing.');
      return;
    }

    if (!caption.trim()) {
      alert('Please add a caption to your post.');
      return;
    }

    await handlecreatePost(file, caption.trim());
    navigate('/');
  }

  if (loading) {
    return (
      <main className="create-post-page">
        <div className="auth-card loading-card">
          <h1>Creating post...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="create-post-page auth-page">
      <div className="auth-card create-post-card">
        <div className="brand-block compact">
          <span className="brand-tag">New story</span>
          <h1>Create Post</h1>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="post-img-label" htmlFor="postImage">
            {selectedImage ? `Selected: ${selectedImage}` : 'Select image'}
          </label>
          <input
            ref={postimageinpiutFieldRef}
            type="file"
            name="imgUrl"
            id="postImage"
            accept="image/*"
            onChange={handleImageChange}
          />

          <input
            value={caption}
            onChange={(e) => setcaption(e.target.value)}
            type="text"
            name="caption"
            id="caption"
            placeholder="Write a caption..."
          />

          <div className="button-row">
            <button type="button" className="button secondary-button" onClick={() => navigate('/')}>
              Cancel
            </button>
            <button type="submit" className="button primary-button">
              Publish
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;