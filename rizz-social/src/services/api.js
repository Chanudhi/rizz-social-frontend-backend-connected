// API Service for frontend-backend communication
const API_BASE = '/api/v1';

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    if (data.code === 'TOKEN_EXPIRED') {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login?session=expired';
    }
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
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE}/posts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: postData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Post creation failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
},

  getUserPosts: async (userId) => {
    const response = await fetch(`${API_BASE}/posts/user/${userId}?_=${Date.now()}`, {
      method: 'GET',
      headers: {
        ...getAuthHeaders(),
      },
      cache: 'no-store'
    });
    
    return handleResponse(response);
  },

  delete: async (postId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE}/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to delete post');
    }

    return response.json();
  },

update: async (postId, postData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Authentication required');

    const response = await fetch(`${API_BASE}/posts/${postId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        // NO Content-Type header - let browser set it with boundary
      },
      body: postData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Update failed');
    }

    return await response.json();
  } catch (error) {
    console.error('API Update Error:', error);
    throw error;
  }
},

  getAll: async () => {
    const response = await fetch(`${API_BASE}/posts`, {
      method: 'GET',
      headers: {
        ...getAuthHeaders(),
      }
    });
    
    return handleResponse(response);
  },

  getById: async (postId) => {
    const response = await fetch(`${API_BASE}/posts/${postId}`, {
      method: 'GET',
      headers: {
        ...getAuthHeaders(),
      }
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