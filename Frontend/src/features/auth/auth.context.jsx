import { createContext, useState } from 'react';
import { login, register, getme } from "./services/auth.api.js"

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setuser] = useState(null);
    const [loading, setloading] = useState(false);

    const handleLogin = async (email, password) => {

        setloading(true);
        try {
            const response = await login(email, password);
            setuser(response.data);
            return response;
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setloading(false);
        }

    }

    const handleRegister = async (email,password,username)=>{
       setloading(true);
        try{
       const response = await register(email,password,username);
       setuser(response.user);
       return response;
        }
        catch(err){
            console.log(err)
        }
        finally{
            setloading(false);
        }
    }

    return <AuthContext.Provider value={{user,loading,handleLogin,handleRegister}}>
        {children}
    </AuthContext.Provider>
}