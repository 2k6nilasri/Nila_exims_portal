// API base URL configuration
const API_BASE = '/api';

export function getAuthToken() {
  return localStorage.getItem('nila_auth_token') || '';
}

export function setAuthToken(token) {
  if (token) {
    localStorage.setItem('nila_auth_token', token);
  } else {
    localStorage.removeItem('nila_auth_token');
  }
}

export async function apiRequest(endpoint, method = 'GET', body = null) {
  const headers = {
    'Content-Type': 'application/json',
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE}${endpoint}`, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'An error occurred while communicating with server.');
    }

    return data;
  } catch (err) {
    throw err;
  }
}
