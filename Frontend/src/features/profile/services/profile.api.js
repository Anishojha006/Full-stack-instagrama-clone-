import api from '../../../shared/api.js';

export async function getFollowers() {
    const response = await api.get('/users/getfollower');
    return response.data.response ?? [];
}

export async function getFollowings() {
    const response = await api.get('/users/getfollowing');
    return response.data.response ?? [];
}

export async function getNewrequest() {
    const response = await api.get('/users/get/request');
    return response.data.allFriendRequest ?? [];
}

export async function getusernameDeatilsfromusername(username) {
    const response = await api.get(`/users/getDetails/${encodeURIComponent(username)}`);
    return response.data.details?.profileImage ?? '';
}

export async function rejectrequest(requestId) {
    const response = await api.put(`/users/rejectRequest/${requestId}`);
    return response.data;
}

export async function acceptRequest(requestId) {
    const response = await api.put(`/users/acceptRequest/${requestId}`);
    return response.data;
}

export async function unfollowUser(username) {
    const response = await api.post(`/users/unfollow/${encodeURIComponent(username)}`);
    return response.data;
}

export async function followUser(username) {
    const response = await api.post(`/users/follow/${encodeURIComponent(username)}`);
    return response.data;
}