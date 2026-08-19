import { getFeed , createPost ,likePost , unlikePost} from "../services/post.api";
import { useContext, useEffect } from "react";
import { postContext } from "../post.context";

export const usePosts = () => {

    const context = useContext(postContext);
    

    if (!context) {
        throw new Error("usePosts must be used inside a postContextProvider");
    }

    const { loading, post, feed, setloading, setFeed, setPost } = context;

    const handleGetFeed = async () => {
        setloading(true);
        const data = await getFeed();
        const posts = data?.posts ?? data?.allPosts ?? [];
        setFeed(posts);
        setloading(false);
    };
    
    const handlecreatePost = async (postImage,caption ) =>{
        setloading(true);
        const data = await createPost(postImage,caption);
        setFeed([data.post, ...feed])
        setloading(false);
    };

    const handlelike = async (postId)=>{
        try {
            setloading(true);
            const response = await likePost(postId);
            setloading(false);
        } catch (error) {
            setloading(false);
            console.error("Error liking post:", error.response?.data?.message || error.message);
        }
    }

    const handleunlike = async (postId)=>{
        try {
            setloading(true);
            const response = await unlikePost(postId);
            setloading(false);
        } catch (error) {
            setloading(false);
            console.error("Error unliking post:", error.response?.data?.message || error.message);
        }
    }

    useEffect(()=>{
    handleGetFeed();
    },[])
    return { loading, feed, post, setPost, handleGetFeed , handlecreatePost ,handlelike,handleunlike};
};