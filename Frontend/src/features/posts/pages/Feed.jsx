import React from 'react'
import "../style/feed.scss"
import Post from '../componenets/Post'
import { usePosts } from '../hooks/usePosts.js'
import Navbar from '../../shared/componenet/Navbar.jsx'

const Feed = () => {
    const { feed, loading } = usePosts();

    if (loading || !feed) {
        return (
            <main>
                <h1>Feed is loading ...</h1>
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