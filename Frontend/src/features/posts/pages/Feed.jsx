import React from 'react'
import "../style/feed.scss"
import Post from '../componenets/Post'
import { usePosts } from '../hooks/usePosts.js'
import Navbar from '../../shared/componenet/Navbar.jsx'

const Feed = () => {
    const {  
        user,
        post,  
        feed,
    loading,
    handlelike,
    handleunlike } = usePosts();

    if (loading ) {
        return (
            <main>
                <h1>Feed is loading </h1>
            </main>
        );
    }
   console.log(feed);
    return (
        <main className='feed-page'>
            <Navbar/>
            <div className="feed">
                <div className="posts">
                    {feed.length > 0 ? (
                        feed.map((postItem) => (
                            <Post
                            handlelike={  handlelike }
                             handleunlike ={ handleunlike}
                                key={postItem._id || postItem.id}
                                user={postItem.user}
                                post={postItem}
                            />
                        ))
                    ) : (
                        <p>No posts yet.</p>
                    )}
                </div>
            </div>
        </main>
    )
}

export default Feed