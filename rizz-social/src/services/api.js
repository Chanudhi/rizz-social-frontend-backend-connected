// API Service for frontend-backend communication

const API_BASE = '/api/v1';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || data.error || 'Request failed');
  }
  
  return data;
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Authentication endpoints
export const authAPI = {
  login: async (credentials) => {
    const response = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials)
    });
    
    return handleResponse(response);
  },

  register: async (userData) => {
    const response = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    
    return handleResponse(response);
  }
};

// Posts endpoints
export const postsAPI = {
  create: async (postData) => {
    const formData = new FormData();
    formData.append('content', postData.content);
    
    if (postData.image) {
      formData.append('image', postData.image);
    }
    
    const response = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(),
      },
      body: formData
    });
    
    return handleResponse(response);
  },

  getUserPosts: async (userId) => {
    const response = await fetch(`${API_BASE}/posts/user/${userId}`, {
      method: 'GET',
      headers: {
        ...getAuthHeaders(),
      }
    });
    
    return handleResponse(response);
  },

  delete: async (postId) => {
    const response = await fetch(`${API_BASE}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        ...getAuthHeaders(),
      }
    });
    
    return handleResponse(response);
  },

  update: async (postId, postData) => {
    const formData = new FormData();
    formData.append('content', postData.content);
    
    if (postData.image) {
      formData.append('image', postData.image);
    }
    
    const response = await fetch(`${API_BASE}/posts/${postId}`, {
      method: 'PUT',
      headers: {
        ...getAuthHeaders(),
      },
      body: formData
    });
    
    return handleResponse(response);
  }
};

// Users endpoints
export const usersAPI = {
  getProfile: async (userId) => {
    const response = await fetch(`${API_BASE}/users/${userId}`, {
      method: 'GET',
      headers: {
        ...getAuthHeaders(),
      }
    });
    
    return handleResponse(response);
  },

  updateProfile: async (userId, userData) => {
    const response = await fetch(`${API_BASE}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(userData)
    });
    
    return handleResponse(response);
  }
};

// Test database connection
export const testDB = async () => {
  const response = await fetch('/api/test-db');
  return handleResponse(response);
};
