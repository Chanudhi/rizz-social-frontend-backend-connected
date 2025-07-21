import Sidebar from "../components/Sidebar";
import Button from "../components/Button";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageIcon, MoreHorizontal, X } from "lucide-react";
import { postsAPI } from "../services/api";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

const handlePost = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    setError('You need to be logged in to post');
    return;
  }

<<<<<<< HEAD
  setIsLoading(true);
  setError('');
=======
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('content', caption.trim());
      if (selectedFile) {
        formData.append('image', selectedFile);
        // Add debug logging
        console.log('Selected file:', {
          name: selectedFile.name,
          type: selectedFile.type,
          size: selectedFile.size
        });
      }
      
      const response = await postsAPI.create(formData);
      console.log('Post created:', response); // Debug log
      
      navigate("/");
    } catch (err) {
      console.error('Full error:', err); // More detailed error logging
      setError(err.response?.data?.error || err.message || "Failed to create post");
    } finally {
      setIsLoading(false);
    }
  };
>>>>>>> 4f08c0dc37f13ad7e39516fbe2d063640bceadae

  const formData = new FormData();
  formData.append('content', caption);
  
  if (selectedFile) {
    formData.append('image', selectedFile);
  }

  try {
    await postsAPI.create(formData);
    navigate("/");
  } catch (err) {
    setError(err.message || 'Failed to create post');
    console.error('Full error:', err);
  } finally {
    setIsLoading(false);
  }
};
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError("Please select a valid image file.");
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB.");
        return;
      }
      
      setSelectedFile(file);
      setFileName(file.name);
      setError("");
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setFileName("");
    const fileInput = document.getElementById('postImage');
    if (fileInput) fileInput.value = '';
  };
  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar showSearch={false} title="Hit the Timeline ✨" />
        
        {/* Main Content Area */}
        <div className="flex-1 flex items-center justify-center pt-24 px-8 ml-60">
          <div className="w-full max-w-lg">
            {/* Post Creation Card */}
            <div className="bg-neutral-800 rounded-2xl p-6 space-y-4 w-full">
              {/* User Info with More Options */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <circle cx="12" cy="8" r="4" fill="#fff" />
                      <ellipse cx="12" cy="17" rx="7" ry="4" fill="#fff" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-semibold text-white">Anne</span>
                    <span className="text-gray-400 text-sm block">@anne</span>
                  </div>
                </div>
                <MoreHorizontal size={24} className="text-gray-400 cursor-pointer" />
              </div>
              
              {/*Error display */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
                  {error}
                </div>
              )}
              
              {/* Text Area */}
              <div className="space-y-4">
                <textarea
                  rows="8"
                  placeholder="What's on your mind?"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full bg-neutral-700 p-4 rounded-lg text-gray-200 placeholder-gray-400 border-none resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  maxLength={500} // Added: Character limit
                />
                
                {/* Character counter */}
                <div className="text-right text-sm text-gray-400">
                  {caption.length}/500
                </div>
                
                {/* Add Images Button */}
                <div className="flex justify-center">
                  <label htmlFor="postImage" className="flex items-center space-x-2 bg-neutral-700 hover:bg-neutral-600 px-6 py-3 rounded-lg cursor-pointer transition">
                    <ImageIcon size={20} className="text-gray-400" />
                    <span className="text-gray-400 font-medium">Add Images</span>
                  </label>
                  <input
                    type="file"
                    id="postImage"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>
                
                {/* Show selected file with remove option */}
                {fileName && (
                  <div className="flex items-center justify-between bg-neutral-700 p-3 rounded-lg">
                    <div className="text-sm text-gray-400">
                      <span className="text-gray-300">Selected: </span>
                      {fileName}
                    </div>
                    <button
                      onClick={removeSelectedFile}
                      className="text-red-400 hover:text-red-300 transition"
                      type="button"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                
                {/* Post Button with loading state */}
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                  onClick={handlePost}
                  disabled={!caption.trim() || isLoading}
                >
                  {isLoading ? "Posting..." : "Post"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}