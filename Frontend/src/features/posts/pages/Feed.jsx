import React, { useEffect } from 'react'
import "../style/feed.scss"
import Post from '../componenets/Post'
import { usePosts } from '../hooks/usePosts.js'
import Navbar from '../../shared/componenet/Navbar.jsx'

const Feed = () => {
    const {
        feed,
        loading,
        postError,
        handlelike,
        handleunlike,
        handleGetFeed
    } = usePosts();

    useEffect(() => {
        handleGetFeed();
    }, [handleGetFeed]);

    return (
        <main className='feed-page'>
            <Navbar/>
            <section className="feed-intro">
                <span className="eyebrow">A window into your world</span>
                <h1>Moments, <em>together.</em></h1>
                <p>Fresh perspectives from the people you follow and love.</p>
            </section>
            <div className="feed">
                <div className="feed-heading">
                    <div>
                        <span className="eyebrow">The latest</span>
                        <h2>Your feed</h2>
                    </div>
                    <span className="feed-count">{feed.length} {feed.length === 1 ? 'moment' : 'moments'}</span>
                </div>
                {postError && <p className="notice error-notice" role="alert">{postError}</p>}
                {loading && feed.length === 0 ? (
                    <div className="feed-loading"><span className="loading-spinner" aria-hidden="true" />Loading your feed...</div>
                ) : <div className="posts">
                    {feed.length > 0 ? (
                        feed.map((postItem) => (
                            <Post
                                handlelike={handlelike}
                                handleunlike={handleunlike}
                                key={postItem._id || postItem.id}
                                user={postItem.user}
                                post={postItem}
                            />
                        ))
                    ) : (
                        <div className="empty-state">
                            <span className="empty-state-icon">✳</span>
                            <h3>Your feed is a blank canvas</h3>
                            <p>Share your first moment or check back when your community has posted.</p>
                        </div>
                    )}
                </div>
                }
            </div>
        </main>
    )
}

export default Feed