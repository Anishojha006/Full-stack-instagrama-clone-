import axios from 'axios';
const api = axios.create({
    baseURL:"http://localhost:3000/api/users",
     withCredentials: true
})

export async function getFollowers() {
const response = await api.get("/getfollower");
return response.response;
}

export async function getNewrequest(){
    const response = await api.get("/get/request");
    return response.allFriendRequest;
}