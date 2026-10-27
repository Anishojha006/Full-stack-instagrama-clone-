import { useState } from "react";
import { createContext } from "react";


export const profileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [requests, setRequests] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);
    const [error, setError] = useState('');

    return (
        <profileContext.Provider value={{
            loading, setLoading, requests, setRequests, followers, setFollowers,
            followings, setFollowings, error, setError
        }}>
            {children}
        </profileContext.Provider>
    )
}

export const profileContextProvider = ProfileContextProvider;