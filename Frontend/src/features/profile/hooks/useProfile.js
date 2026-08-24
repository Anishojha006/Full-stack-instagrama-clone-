import { useContext } from "react";
import { profileContext } from "../profile.context.jsx";
import { getNewrequest, getFollowers } from "../services/profile.api.js";

export const useProfile = () => {
    const context = useContext(profileContext);

    if (!context) {
        throw new Error(
            "useProfile must be used inside a ProfileContextProvider"
        );
    }

    const {
        loading,
        setLoading,
        requests,
        setRequests
    } = context;

    const handleNewRequest = async () => {
        try {
            setLoading(true);

            const response = await getNewrequest();

            setRequests(response ?? []);
        } catch (err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    };

    return {
        handleNewRequest,
        loading,
        requests
    };
};