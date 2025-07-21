import { useNavigate } from 'react-router-dom';
import { useState,useCallback, useEffect } from 'react';
import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { Heart, MessageCircle, Send, MoreHorizontal, ImageIcon, X } from "lucide-react";
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import { useAuth } from "../contexts/AuthContext";
import { postsAPI } from "../services/api";

export default function PostEditDelete() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [editFormData, setEditFormData] = useState({
    caption: "",
    selectedFile: null,
    fileName: ""
  });
  
  const [loading, setLoading] = useState({
    posts: false,
    editing: false,
    deleting: false
  });
  
  const [errors, setErrors] = useState({
    edit: "",
    delete: "",
    general: ""
  });
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

const fetchUserPosts = useCallback(async () => {
  setLoading(prev => ({ ...prev, posts: true }));
  setErrors(prev => ({ ...prev, general: "" }));
  
  try {
    const response = await postsAPI.getUserPosts(user.id);
    setPosts(Array.isArray(response) ? response : []);
  } catch (error) {
    setErrors(prev => ({ ...prev, general: error.message || "Failed to load posts" }));
    console.error("Error fetching posts:", error);
    setPosts([]);
  } finally {
    setLoading(prev => ({ ...prev, posts: false }));
  }
}, [user.id]); 

useEffect(() => {
  fetchUserPosts();
}, [fetchUserPosts]);

  const handleEditProfile = () => {
    navigate('/profile');
  };

  const handleStartEdit = (post) => {
    setEditingPost(post.id);
    setEditFormData({
      caption: post.content,
      selectedFile: null,
      fileName: ""
    });
    setErrors(prev => ({ ...prev, edit: "" }));
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
    setEditFormData({
      caption: "",
      selectedFile: null,
      fileName: ""
    });
  };

  const handleEditInputChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors.edit) {
      setErrors(prev => ({ ...prev, edit: "" }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, edit: "Please select a valid image file." }));
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, edit: "File size must be less than 5MB." }));
        return;
      }
      
      setEditFormData(prev => ({
        ...prev,
        selectedFile: file,
        fileName: file.name
      }));
      setErrors(prev => ({ ...prev, edit: "" }));
    }
  };

  const removeSelectedFile = () => {
    setEditFormData(prev => ({
      ...prev,
      selectedFile: null,
      fileName: ""
    }));
    const fileInput = document.getElementById('editPostImage');
    if (fileInput) fileInput.value = '';
  };

  const validateEditForm = () => {
    if (!editFormData.caption.trim()) {
      setErrors(prev => ({ ...prev, edit: "Caption cannot be empty" }));
      return false;
    }
    
    if (editFormData.caption.length > 500) {
      setErrors(prev => ({ ...prev, edit: "Caption must be less than 500 characters" }));
      return false;
    }
    
    return true;
  };

const handleSaveEdit = async () => {
  if (!validateEditForm()) return;
  
  setLoading(prev => ({ ...prev, editing: true }));
  setErrors(prev => ({ ...prev, edit: "" }));
  
  try {
    const formData = new FormData();
    formData.append('content', editFormData.caption.trim());
    
    // Debug: Log FormData contents before sending
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    if (editFormData.selectedFile) {
      formData.append('image', editFormData.selectedFile);
    }
    
    await postsAPI.update(editingPost, formData);
    await fetchUserPosts();
    setEditingPost(null);
  } catch (error) {
    setErrors(prev => ({ 
      ...prev, 
      edit: error.message || "Failed to update post. Please try again." 
    }));
    console.error("Error updating post:", error);
  } finally {
    setLoading(prev => ({ ...prev, editing: false }));
  }
};

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
    setErrors(prev => ({ ...prev, delete: "" }));
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setPostToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!postToDelete) return;
    
    setLoading(prev => ({ ...prev, deleting: true }));
    
    try {
      await postsAPI.delete(postToDelete.id);
      await fetchUserPosts();
      setShowDeleteModal(false);
    } catch (error) {
      setErrors(prev => ({ ...prev, delete: error.message || "Failed to delete post" }));
      console.error("Error deleting post:", error);
    } finally {
      setLoading(prev => ({ ...prev, deleting: false }));
    }
  };

  const handlePostInteraction = (postId, type) => {
    console.log(`${type} action for post:`, postId);
    // Implement API calls for post interactions
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar showSearch={false} title="Profile ✨" />
        
        {/* Main Content */}
        <div className="flex justify-center pt-36 px-4">
          <div className="w-full max-w-4xl ml-80 mr-12 space-y-6">
            
            {/* General Error Display */}
            {errors.general && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
                {errors.general}
              </div>
            )}
            
            {/* Profile Card */}
            <div className="bg-neutral-800 p-6 rounded-2xl flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{user.username?.charAt(0).toUpperCase()}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-white text-xl">{user.username}</span>
                  <span className="text-gray-400 text-sm">@{user.username}</span>
                </div>
              </div>
              <button 
                onClick={handleEditProfile}
                className="bg-neutral-700 hover:bg-neutral-600 text-gray-200 px-6 py-2 rounded-full font-medium transition"
              >
                Edit Profile
              </button>
            </div>
            
            {/* Posts Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">
                Posts {loading.posts && "(Loading...)"}
              </h3>
              
              {/* Posts List */}
              {Array.isArray(posts) && posts.length === 0 && !loading.posts ? (
              <div className="text-center py-12 text-gray-400">
                <p>No posts yet. Start sharing your thoughts!</p>
                <button 
                  onClick={() => navigate('/create')}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition"
                >
                  Create Post
                </button>
              </div>
              ) : (
                Array.isArray(posts) && posts.map((post) => (
                  <div key={post.id} className="bg-neutral-800 p-6 rounded-2xl space-y-4">
                    {/* Post Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center">
                          <span className="text-white text-lg font-bold">{user.username?.charAt(0).toUpperCase()}</span>
                        </div>
                        <div>
                          <span className="font-semibold block text-white">{user.username}</span>
                          <span className="text-gray-400 text-sm block">{new Date(post.created_at).toLocaleString()}</span>
                        </div>
                      </div>
                      <MoreHorizontal size={24} className="text-gray-400 cursor-pointer" />
                    </div>
                    
                    {/* Post Content */}
                    <div className="flex flex-row gap-6">
                      {post.image_url && (
                        <img
                          src={post.image_url}
                          alt="post"
                          className="w-156 h-96 object-cover rounded-xl flex-shrink-0"
                        />
                      )}
                      <div className="flex flex-col justify-between flex-1">
                        {editingPost === post.id ? (
                          // Edit Mode
                          <div className="space-y-4">
                            {errors.edit && (
                              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
                                {errors.edit}
                              </div>
                            )}
                            
                            <textarea
                              value={editFormData.caption}
                              onChange={(e) => handleEditInputChange('caption', e.target.value)}
                              className="w-full bg-neutral-700 p-3 rounded-lg text-gray-200 placeholder-gray-400 border-none resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                              rows="4"
                              maxLength={500}
                              placeholder="Edit your caption..."
                            />
                            
                            <div className="text-right text-sm text-gray-400">
                              {editFormData.caption.length}/500
                            </div>
                            
                            {/* File Upload for Edit */}
                            <div className="flex items-center gap-4">
                              <label htmlFor="editPostImage" className="flex items-center space-x-2 bg-neutral-700 hover:bg-neutral-600 px-4 py-2 rounded-lg cursor-pointer transition">
                                <ImageIcon size={16} className="text-gray-400" />
                                <span className="text-gray-400 text-sm">Change Image</span>
                              </label>
                              <input
                                type="file"
                                id="editPostImage"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                              />
                            </div>
                            
                            {editFormData.fileName && (
                              <div className="flex items-center justify-between bg-neutral-700 p-2 rounded-lg">
                                <span className="text-sm text-gray-300">{editFormData.fileName}</span>
                                <button
                                  onClick={removeSelectedFile}
                                  className="text-red-400 hover:text-red-300 transition"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            )}
                          </div>
                        ) : (
                          // View Mode
                          <p className="text-gray-300 text-base leading-relaxed">
                            {post.content}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Post Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-8 items-center text-gray-400">
                        <button 
                          onClick={() => handlePostInteraction(post.id, 'like')}
                          className="flex items-center space-x-2 hover:text-pink-500 transition"
                        >
                          <Heart size={22} />
                          <span className="text-base">{post.likes || 0}</span>
                        </button>
                        <button 
                          onClick={() => handlePostInteraction(post.id, 'comment')}
                          className="flex items-center space-x-2 hover:text-blue-500 transition"
                        >
                          <MessageCircle size={22} />
                          <span className="text-base">{post.comments || 0}</span>
                        </button>
                        <button 
                          onClick={() => handlePostInteraction(post.id, 'share')}
                          className="flex items-center space-x-2 hover:text-green-500 transition"
                        >
                          <Send size={22} />
                          <span className="text-base">{post.shares || 0}</span>
                        </button>
                        <button 
                          onClick={() => handlePostInteraction(post.id, 'save')}
                          className="hover:text-yellow-500 transition"
                        >
                          <TurnedInIcon className="w-6 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-4">
                      {editingPost === post.id ? (
                        // Edit Mode Actions
                        <>
                          <Button 
                            onClick={handleSaveEdit}
                            disabled={loading.editing}
                            className="bg-green-600 hover:bg-green-700 flex-1"
                          >
                            {loading.editing ? "Saving..." : "Save Changes"}
                          </Button>
                          <Button 
                            onClick={handleCancelEdit}
                            disabled={loading.editing}
                            className="bg-gray-600 hover:bg-gray-700 flex-1"
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        // Default Actions
                        <>
                          <Button 
                            onClick={() => handleStartEdit(post)}
                            className="bg-blue-600 hover:bg-blue-700 flex-1 flex items-center justify-center gap-2"
                          >
                            Edit
                          </Button>
                          <Button 
                            onClick={() => handleDeleteClick(post)}
                            className="bg-red-600 hover:bg-red-700 flex-1 flex items-center justify-center gap-2"
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-neutral-800 p-6 rounded-2xl max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold text-white mb-4">Delete Post</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            
            {errors.delete && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm mb-4">
                {errors.delete}
              </div>
            )}
            
            <div className="flex space-x-4">
              <button
                onClick={handleCancelDelete}
                disabled={loading.deleting}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-full transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={loading.deleting}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-full transition disabled:opacity-50"
              >
                {loading.deleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}