import axios from 'axios';
const api = axios.create({
    baseURL:"http://localhost:3000/api",
     withCredentials: true
})

export async function getFollowers() {
const response = await api.get("/users/getfollower");
return response;
 return ;    
}