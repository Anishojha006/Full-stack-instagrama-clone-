import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, getme, register } from '../services/auth.api.js'

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setuser, loading, setloading } = context;


    const handlelogin = async (email, password) => {
        setloading(true);
        try {
            const response = await login(email, password);
            setuser(response.user);
            setloading(false);
            return response;
        } catch (err) {
            setloading(false);
            throw err;
        }
    }

    const handleregister = async (email, password, username) => {
        setloading(true);
        try {
            const response = await register(username, email, password);
            setuser(response.user);
            setloading(false);
            return response;
        } catch (err) {
            setloading(false);
            throw err;
        }
    }

    return {
        user, loading, handlelogin, handleregister
    }

}