import { useContext } from "react";
import { AuthContext } from "../auth.context";
import {
    login,
    register,
    logout
} from "../services/auth.api.js";


export const useAuth = () => {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }


    const {
        user,
        setuser,
        loading,
        setloading,
        authError
    } = context;


    const handlelogin = async (email, password) => {

        setloading(true);

        try {
            const response = await login(email, password);
            setuser(response.user);
            return response;
        } finally {

            setloading(false);

        }

    };


    const handleregister = async (
        email,
        password,
        username
    ) => {

        setloading(true);

        try {
            const response = await register(username, email, password);
            setuser(response.user);
            return response;
        } finally {

            setloading(false);

        }

    };

    const handlelogout = async () => {
        setloading(true);
        try {
            await logout();
            setuser(null);
        } finally {
            setloading(false);
        }
    };


    return {
        user,
        loading,
        authError,
        handlelogin,
        handleregister,
        handlelogout
    };

};