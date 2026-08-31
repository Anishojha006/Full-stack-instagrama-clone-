import { createContext, useEffect, useState } from "react";
import { getme } from "./services/auth.api.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setuser] = useState(null);
    const [loading, setloading] = useState(true);

    useEffect(() => {

        const checkUser = async () => {

            try {

                const response = await getme();

                setuser(response.user);

            } catch (error) {

                console.log("User is not logged in");

                setuser(null);

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
                setloading
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};