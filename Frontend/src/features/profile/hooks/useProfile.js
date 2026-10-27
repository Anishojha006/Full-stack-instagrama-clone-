import { useCallback, useContext } from 'react';
import { profileContext } from '../profile.context.jsx';
import {
    acceptRequest,
    followUser,
    getFollowers,
    getFollowings,
    getNewrequest,
    getusernameDeatilsfromusername,
    rejectrequest,
    unfollowUser
} from '../services/profile.api.js';

export const useProfile = () => {
    const context = useContext(profileContext);

    if (!context) {
        throw new Error('useProfile must be used inside a ProfileContextProvider');
    }

    const {
        loading,
        setLoading,
        requests,
        setRequests,
        followers,
        setFollowers,
        followings,
        setFollowings,
        error,
        setError
    } = context;

    const handleLoadProfile = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const [newRequests, currentFollowers, currentFollowings] = await Promise.all([
                getNewrequest(),
                getFollowers(),
                getFollowings()
            ]);
            setRequests(newRequests);
            setFollowers(currentFollowers);
            setFollowings(currentFollowings);
        } catch (err) {
            setError(err.response?.data?.message || 'Could not load your profile. Please try again.');
        } finally {
            setLoading(false);
        }
    }, [setError, setFollowers, setFollowings, setLoading, setRequests]);

    const profileImagefromusername = useCallback(async (username) => {
        try {
            return await getusernameDeatilsfromusername(username);
        } catch (err) {
            setError(err.response?.data?.message || `Could not load ${username}'s profile image.`);
            return '';
        }
    }, [setError]);

    const handlerequestRejection = useCallback(async (requestId) => {
        const response = await rejectrequest(requestId);
        setRequests((currentRequests) => currentRequests.filter((request) => request._id !== requestId));
        return response;
    }, [setRequests]);

    const handleRequestAcceptance = useCallback(async (requestId) => {
        const response = await acceptRequest(requestId);
        setRequests((currentRequests) => currentRequests.filter((request) => request._id !== requestId));
        await handleLoadProfile();
        return response;
    }, [handleLoadProfile, setRequests]);

    const handleUnfollow = useCallback(async (username) => {
        try {
            await unfollowUser(username);
            setFollowings((currentFollowings) => currentFollowings.filter((following) => following.followee !== username));
        } catch (err) {
            setError(err.response?.data?.message || `Could not unfollow ${username}.`);
            throw err;
        }
    }, [setError, setFollowings]);

    const handleFollow = useCallback(async (username) => {
        try {
            return await followUser(username);
        } catch (err) {
            setError(err.response?.data?.message || `Could not send a follow request to ${username}.`);
            throw err;
        }
    }, [setError]);

    return {
        profileImagefromusername,
        handleLoadProfile,
        loading,
        error,
        requests,
        followers,
        followings,
        handlerequestRejection,
        handleRequestAcceptance,
        handleFollow,
        handleUnfollow
    };
};
