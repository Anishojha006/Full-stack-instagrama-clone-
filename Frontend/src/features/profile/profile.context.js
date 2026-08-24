import { useState } from "react";
import { createContext } from "react";


export const profileContext = createContext();

export const ProfileContextProvider =({children})=>{
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState([]);

     return (
                    <profileContext.Provider value={{ loading, setLoading, requests, setRequests }}>
              {children}
          </profileContext.Provider>
      )
}

export const  profileContextProvider = ProfileContextProvider;