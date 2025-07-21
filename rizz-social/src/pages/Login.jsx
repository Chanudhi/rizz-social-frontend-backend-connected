import InputField from "../components/InputField";
import Button from "../components/Button";
import loginImg from "../assets/images/login.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  //  State management for form data and validation
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

  //  Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear specific field error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
    
    // Clear general error
    if (generalError) {
      setGeneralError("");
    }
  };

  //Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setGeneralError("");
    
    try {
     //replace with actual API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(formData)
      // });
      
      // const data = await response.json();
      
      // if (!response.ok) {
      //   throw new Error(data.message || 'Login failed');
      // }
      
      // //Store auth token
      // localStorage.setItem('token', data.token);
      // localStorage.setItem('user', JSON.stringify(data.user));
      
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Login attempt:", formData);
      
      // Navigate to home on successful login
      navigate("/");
    } catch (err) {
      setGeneralError(err.message || "Login failed. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex">
      {/* Left: Login Form */}
      <div className="flex flex-col justify-center items-center w-1/2 px-16">
        <h1 className="text-3xl mb-8 font-semibold text-center">
          Login to <span className="font-irishgrover text-4xl">Rizz</span>
        </h1>
        
        {/* Form with proper submission handling */}
        <form onSubmit={handleSubmit} className="w-full max-w-[340px] space-y-4">
          {/* General error display */}
          {generalError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
              {generalError}
            </div>
          )}
          
          {/*  Username field with validation */}
          <div>
            <InputField 
              placeholder="Username" 
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className={errors.username ? 'border border-red-500' : ''}
            />
            {errors.username && (
              <p className="text-red-400 text-xs mt-1 ml-4">{errors.username}</p>
            )}
          </div>
          
          {/* : Password field with validation */}
          <div>
            <InputField 
              type="password" 
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className={errors.password ? 'border border-red-500' : ''}
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1 ml-4">{errors.password}</p>
            )}
          </div>
          
          {/* Submit button with loading state */}
          <Button 
            type="submit"
            disabled={isLoading}
            className={isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          
          <p className="text-xs mt-8 text-gray-400 text-center font-light">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>

      {/* Right: Image */}
      <div className="flex items-center justify-center w-1/2 bg-black">
        <img
          src={loginImg}
          alt="Login"
          className="w-[500px] h-[700px] object-cover rounded-2xl shadow-lg"
        />
      </div>
    </div>
  );
}