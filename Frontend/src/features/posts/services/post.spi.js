import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true
})

export async function getFeed() {
    const response = await api.get('/posts/feed')
    return response.data;
}

export async function createPost() {
    const response = await api.post("/api/posts", {
        imgUrl: imgUrl,
        caption: caption
    });
    return response.data
}