import { getFeed , createPost} from "../services/post.spi";
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
    }
    useEffect(()=>{
    handleGetFeed();
    },[])
    return { loading, feed, post, setPost, handleGetFeed , handlecreatePost };
};