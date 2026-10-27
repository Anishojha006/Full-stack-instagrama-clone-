import api from '../../../shared/api.js';

export async function register(username, email, password) {
  const response = await api.post('/auth/register', { username, email, password });
  return response.data;
}

export async function login(email, password) {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
}

export async function getme() {
  const response = await api.get('/auth/getme');
  return response.data;
}

export async function logout() {
  const response = await api.post('/auth/logout');
  return response.data;
}