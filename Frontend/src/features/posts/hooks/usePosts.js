import {
    getFeed,
    createPost,
    likePost,
    unlikePost
} from "../services/post.api";

import { useContext, useEffect } from "react";
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
        setloading,
        setFeed,
        setPost
    } = context;


    const handleGetFeed = async () => {
        try {
            setloading(true);

            const data = await getFeed();

            const posts =
                data?.posts ??
                data?.allPosts ??
                [];

            setFeed(posts);

        } catch (error) {
            console.error(
                "Error getting feed:",
                error.response?.data?.message ||
                error.message
            );
        } finally {
            setloading(false);
        }
    };


    const handlecreatePost = async (postImage, caption) => {
        try {
            setloading(true);

            const data = await createPost(
                postImage,
                caption
            );

            setFeed((currentFeed) => [
                data.post,
                ...currentFeed
            ]);

        } catch (error) {
            console.error(
                "Error creating post:",
                error.response?.data?.message ||
                error.message
            );
        } finally {
            setloading(false);
        }
    };


    const handlelike = async (postId) => {
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

            console.error(
                "Error liking post:",
                error.response?.data?.message ||
                error.message
            );

        }
    };


    const handleunlike = async (postId) => {
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

            console.error(
                "Error unliking post:",
                error.response?.data?.message ||
                error.message
            );

        }
    };


    useEffect(() => {
        handleGetFeed();
    }, []);


    return {
        loading,
        feed,
        post,
        setPost,
        handleGetFeed,
        handlecreatePost,
        handlelike,
        handleunlike
    };
};