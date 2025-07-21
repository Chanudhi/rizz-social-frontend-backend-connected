import { useNavigate } from 'react-router-dom';
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { usersAPI } from "../services/api";

export default function Profile() {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    email: user.email || "",
    username: user.username || "",
    password: ""
  });

  useEffect(() => {
    // Fetch or update user profile as needed
    // This is a placeholder for actual data-fetching logic if needed
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Update user profile via API
      await usersAPI.updateProfile(user.id, formData);
      // Update auth context with new user data
      updateUser({
        email: formData.email,
        username: formData.username
      });
      // Show success message or handle success actions
      // For now, just stop editing mode
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data if needed
    setFormData({
      email: "",
      username: "",
      password: ""
    });
    // Navigate back to PostEditDelete page
    navigate('/post');
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar showSearch={false} title="Profile ✨" />
        
        {/* Main Content Area */}
        <div className="flex-1 flex items-center justify-center pt-24 px-8 ml-60">
          <div className="w-full max-w-lg">
            {/* Profile Edit Card */}
            <div className="bg-neutral-700 rounded-2xl p-8 space-y-6 w-full">
              {/* Header with Cancel and Save Changes buttons */}
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={handleCancel}
                  className="text-red-500 hover:text-red-400 font-medium transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveChanges}
                  className="text-white hover:text-gray-300 font-medium transition"
                >
                  Save Changes
                </button>
              </div>
              
              {/* Profile Avatar and Info */}
              <div className="flex flex-col items-center space-y-4 mb-8">
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">{user.username[0].toUpperCase()}</span>
                </div>
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-white">{user.username}</h2>
                  <p className="text-gray-400">@{user.username}</p>
                </div>
              </div>
              
              {/* Form Fields */}
              <div className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-neutral-600 border-none rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
                
                {/* Change Password Field */}
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Change password
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Change Password"
                    className="w-full px-4 py-3 bg-neutral-600 border-none rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}