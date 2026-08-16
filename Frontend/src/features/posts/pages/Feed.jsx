import React from 'react'
import "../style/feed.scss"
const Feed = () => {
  return (
   <main className='feed-page'>
        <div className="feed">
            <div className="posts">
           <div className="post">
             <div className="user">
                <div className="image-warapper">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fHww" alt="" />
                </div>
                <p>Username</p>
            </div>
            <img src="https://plus.unsplash.com/premium_photo-1667405554973-18349f4d4dd1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dHJlZXN8ZW58MHx8MHx8fDA%3D" alt="" />
            <div className="bottom">
                <p className="caption">caption</p>
            </div>
           </div>
        </div>
        </div>
   </main>
  )
}

export default Feed