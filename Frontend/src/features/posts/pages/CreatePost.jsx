import React, { useState, useRef } from 'react'
import '../style/createPost.scss'
import {usePosts} from "../hooks/usePosts.js"
import {useNavigate} from 'react-router'

const CreatePost = () => {

  const [caption, setcaption] = useState("");
  const postimageinpiutFieldRef = useRef(null);
  const { loading, handlecreatePost } = usePosts();
  const naviaget = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const file = postimageinpiutFieldRef.current.files[0];
    await handlecreatePost(file, caption);
    naviaget("/")
  }

  if (loading) {
    return <main>
      <h1>creating post ...</h1>
    </main>
  }

  return (
    <main className='create-post-page'>

      <div className="form-container">
        <h1>Create Post</h1>

        <form onSubmit={handleSubmit}>
          <label className='post-img-label' htmlFor="postImage">Select Image</label>
          <input ref={postimageinpiutFieldRef} hidden type="file" name='imgUrl' id='postImage' />
          <input value={caption} onChange={(e) => {
            setcaption(e.target.value);
          }} type="text" name='caption' id='caption' placeholder='Enter Caption' />
          <button className='button primary-button'>Create post</button>
        </form>
      </div>
    </main>
  )
}

export default CreatePost