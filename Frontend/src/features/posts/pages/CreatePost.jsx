import React, { useState, useRef, useEffect } from 'react';
import '../style/createPost.scss';
import { usePosts } from '../hooks/usePosts.js';
import { useNavigate } from 'react-router';

const CreatePost = () => {
  const [caption, setcaption] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [error, setError] = useState('');
  const postimageinpiutFieldRef = useRef(null);
  const { loading, handlecreatePost } = usePosts();
  const navigate = useNavigate();

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const handleImageChange = () => {
    const file = postimageinpiutFieldRef.current?.files?.[0];
    setSelectedImage(file ? file.name : null);
    setPreviewUrl((currentUrl) => {
      if (currentUrl) URL.revokeObjectURL(currentUrl);
      return file ? URL.createObjectURL(file) : '';
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const file = postimageinpiutFieldRef.current?.files?.[0];

    if (!file) {
      setError('Choose an image before publishing your post.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Choose a valid image file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Choose an image smaller than 10 MB.');
      return;
    }

    if (!caption.trim()) {
      setError('Add a caption before publishing your post.');
      return;
    }

    setError('');
    try {
      await handlecreatePost(file, caption.trim());
      navigate('/');
    } catch (submitError) {
      setError(submitError.message);
    }
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
          <h1>Create a moment</h1>
          <p>Give your community a glimpse into your day.</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form create-post-form">
          <label className={`upload-area ${previewUrl ? 'has-preview' : ''}`} htmlFor="postImage">
            {previewUrl ? <img src={previewUrl} alt="Selected post preview" /> : (
              <>
                <span className="upload-icon">↑</span>
                <strong>Choose a photo</strong>
                <span>JPG, PNG or GIF · up to 10 MB</span>
              </>
            )}
          </label>
          <input ref={postimageinpiutFieldRef} type="file" name="image" id="postImage" accept="image/*" onChange={handleImageChange} />
          {selectedImage && <p className="selected-file">{selectedImage}</p>}

          <label className="field-label" htmlFor="caption">Caption</label>
          <textarea value={caption} onChange={(e) => setcaption(e.target.value)} name="caption" id="caption" placeholder="What’s happening in this moment?" maxLength={500} required />
          <span className="character-count">{caption.length}/500</span>
          {error && <p className="form-error" role="alert">{error}</p>}

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