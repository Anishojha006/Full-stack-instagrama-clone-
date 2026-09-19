import axios from 'axios';
const api = axios.create({
    baseURL:"http://localhost:3000/api/users",
     withCredentials: true
})

export async function getFollowers() {
const response = await api.get("/getfollower");
return response.data.response ?? [];
}

export async function getNewrequest(){
    const response = await api.get("/get/request");
    return response.data.allFriendRequest ?? [];
}

export async function getusernameDeatilsfromusername(username) {
    const response = await api.get(`/getDetails/${username}`);
    return response.data.details.profileImage;
}

export async function rejectrequest(requestId){
    const response = await api.put(`/rejectRequest/${requestId}`);
    return  response.data;
}