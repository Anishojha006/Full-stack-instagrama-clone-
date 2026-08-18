import React ,{useState,useRef} from 'react'
import '../style/createPost.scss'
const CreatePost = () => {
 
  const [caption, setcaption] = useState("");
  const postimageinpiutFieldRef  = useRef(null);
  
 function handleSubmit(e){
  e.preventDefault();
  const file  = postimageinpiutFieldRef.current.files[0]
 }

  return (
  <main className='create-post-page'>

   <div className="form-container">
    <h1>Create Post</h1>

    <form onSubmit={handleSubmit}>
      <label className='post-img-label' htmlFor="postImage">Select Image</label>
      <input ref={postimageinpiutFieldRef} hidden type="file" name='imgUrl' id='postImage' />
      <input value={caption} onChange={(e)=>{
        setcaption(e.target.value);
      }} type="text" name='caption' id='caption' placeholder='Enter Caption' />
      <button className='button primary-button'>Create post</button>
    </form>
   </div>
  </main>
  )
}

export default CreatePost