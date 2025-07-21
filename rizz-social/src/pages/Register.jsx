import InputField from "../components/InputField";
import Button from "../components/Button";
import registerImg from "../assets/images/login.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authAPI } from "../services/api";

export default function Register() {
  //  State management for form data and validation
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const navigate = useNavigate();

  //Handle input changes
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

  // Email validation helper
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = "Username can only contain letters, numbers, and underscores";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //  Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setGeneralError("");
    try {
      await authAPI.register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      // Navigate to login page on successful registration
      navigate("/login");
    } catch (err) {
      setGeneralError(err.message || "Registration failed. Please try again.");
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex">
      {/* Left: Register Form */}
      <div className="flex flex-col justify-center items-center w-1/2 px-16">
        <h1 className="text-3xl mb-8 font-semibold text-center">
          Sign up to <span className="font-irishgrover text-4xl">Rizz</span>
        </h1>
        
        {/* Form with proper submission handling */}
        <form onSubmit={handleSubmit} className="w-full max-w-[340px] space-y-4">
          {/*  General error display */}
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
          
          {/* Email field with validation */}
          <div>
            <InputField 
              type="email" 
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={errors.email ? 'border border-red-500' : ''}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1 ml-4">{errors.email}</p>
            )}
          </div>
          
          {/* Password field with validation */}
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
          
          {/* Confirm password field */}
          <div>
            <InputField 
              type="password" 
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={errors.confirmPassword ? 'border border-red-500' : ''}
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1 ml-4">{errors.confirmPassword}</p>
            )}
          </div>
          
          {/*Submit button with loading state */}
          <Button 
            type="submit"
            disabled={isLoading}
            className={`w-full mt-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{ borderRadius: 30 }}
          >
            {isLoading ? "Creating Account..." : "Register"}
          </Button>
          
          <p className="text-xs mt-8 text-gray-400 text-center font-light">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
      
      {/* Right: Image */}
      <div className="flex items-center justify-center w-1/2 bg-black">
        <img
          src={registerImg}
          alt="Register"
          className="w-[500px] h-[700px] object-cover rounded-2xl shadow-lg"
        />
      </div>
    </div>
  );
}