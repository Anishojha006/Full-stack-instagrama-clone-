import { createContext, useEffect, useState } from "react";
import { getme } from "./services/auth.api.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setuser] = useState(null);
    const [loading, setloading] = useState(true);
    const [authError, setauthError] = useState('');

    useEffect(() => {

        const checkUser = async () => {

            try {

                const response = await getme();

                setuser(response.user);
                setauthError('');

            } catch (error) {
                setuser(null);
                if (!error.response) {
                    setauthError('Cannot reach the server. Check that the backend is running, then try again.');
                } else if (![401, 404].includes(error.response.status)) {
                    setauthError('Could not verify your session. Please try again.');
                } else {
                    setauthError('');
                }

            } finally {

                setloading(false);

            }

        };

        checkUser();

    }, []);


    return (
        <AuthContext.Provider
            value={{
                user,
                setuser,
                loading,
                setloading,
                authError
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};