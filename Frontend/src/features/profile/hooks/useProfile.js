import { useContext } from "react";
import { profileContext } from "../profile.context.jsx";
import { getNewrequest, getFollowers, getusernameDeatilsfromusername, rejectrequest } from "../services/profile.api.js";

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

    const profileImagefromusername = async (username) => {
        try {
            setLoading(true);
            const response = await getusernameDeatilsfromusername(username);
            setLoading(false);
            return response;
        }
        catch (err) {
            console.log(err.message);
        }
    }
    const handlerequestRejection = async (requestId) => {
        const response = await rejectrequest(requestId);
        setRequests((currentRequests) =>
            currentRequests.filter((request) => request._id !== requestId)
        );
        return response.data;
    }
    return {
        profileImagefromusername,
        handleNewRequest,
        loading,
        requests,
        handlerequestRejection
    };
};