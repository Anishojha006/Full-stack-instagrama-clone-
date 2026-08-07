import axios from 'axios';
const api = axios.create({
    baseURL:"http://localhost:3000/api/auth",     widthCredintials: true
})


export async function register(username, email, password) {
    try {
        const response = await api.post("/register", {
            username, email, password
        })
    }
    catch (err) {
        throw err
    }
}


export async function login(username, password) {
    try {
        const response = await api.post("/login", {
            username, password
        })
    }
    catch (err) {
        throw err
    }
}