import {
    getFeed,
    createPost,
    likePost,
    unlikePost
} from "../services/post.api";

import { useCallback, useContext } from "react";
import { postContext } from "../post.context";

export const usePosts = () => {

    const context = useContext(postContext);

    if (!context) {
        throw new Error(
            "usePosts must be used inside a postContextProvider"
        );
    }

    const {
        loading,
        post,
        feed,
        postError,
        setloading,
        setFeed,
        setPost,
        setPostError
    } = context;


    const handleGetFeed = useCallback(async () => {
        try {
            setloading(true);
            setPostError('');

            const data = await getFeed();

            const posts =
                data?.posts ??
                data?.allPosts ??
                [];

            setFeed(posts);

        } catch (error) {
            setPostError(error.response?.data?.message || 'Could not load the feed. Please try again.');
        } finally {
            setloading(false);
        }
    }, [setFeed, setloading, setPostError]);


    const handlecreatePost = useCallback(async (postImage, caption) => {
        try {
            setloading(true);
            setPostError('');

            const data = await createPost(
                postImage,
                caption
            );

            setFeed((currentFeed) => [
                data.post,
                ...currentFeed
            ]);
            return data;

        } catch (error) {
            const message = error.response?.data?.message || 'Could not publish your post. Please try again.';
            setPostError(message);
            throw new Error(message);
        } finally {
            setloading(false);
        }
    }, [setFeed, setloading, setPostError]);


    const handlelike = useCallback(async (postId) => {
        try {

            await likePost(postId);

            setFeed((currentFeed) =>
                currentFeed.map((postItem) =>
                    postItem._id === postId
                        ? {
                            ...postItem,
                            isLiked: true
                        }
                        : postItem
                )
            );

        } catch (error) {
            setPostError(error.response?.data?.message || 'Could not like this post. Please try again.');

        }
    }, [setFeed, setPostError]);


    const handleunlike = useCallback(async (postId) => {
        try {

            await unlikePost(postId);

            setFeed((currentFeed) =>
                currentFeed.map((postItem) =>
                    postItem._id === postId
                        ? {
                            ...postItem,
                            isLiked: false
                        }
                        : postItem
                )
            );

        } catch (error) {
            setPostError(error.response?.data?.message || 'Could not unlike this post. Please try again.');

        }
    }, [setFeed, setPostError]);
    
    return {
        loading,
        postError,
        feed,
        post,
        setPost,
        handleGetFeed,
        handlecreatePost,
        handlelike,
        handleunlike
    };
};