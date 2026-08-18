import { createContext, useState } from "react";

export const postContext = createContext(null);

export const PostContextProvider = ({ children }) => {
    const [loading, setloading] = useState(false);
    const [post, setPost] = useState(null);
    const [feed, setFeed] = useState([]);

    return (
        <postContext.Provider value={{ loading, post, feed, setloading, setFeed, setPost }}>
            {children}
        </postContext.Provider>
    )
};

export const postContextProvider = PostContextProvider;