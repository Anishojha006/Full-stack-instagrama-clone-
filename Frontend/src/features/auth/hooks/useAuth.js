import { useContext } from "react";
import { AuthContext } from "../auth.context";
import {
    login,
    register
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
        setloading
    } = context;


    const handlelogin = async (email, password) => {

        setloading(true);

        try {

            const response = await login(
                email,
                password
            );

            setuser(response.user);

            return response;

        } catch (error) {

            throw error;

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

            const response = await register(
                username,
                email,
                password
            );

            setuser(response.user);

            return response;

        } catch (error) {

            throw error;

        } finally {

            setloading(false);

        }

    };


    return {
        user,
        loading,
        handlelogin,
        handleregister
    };

};