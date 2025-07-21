import { Bell, User } from "lucide-react";
import SearchBar from "./SearchBar";
import { NavLink } from "react-router-dom";

export default function Navbar({ showSearch = true, title = null }) {
  return (
    <nav className="w-[calc(100%-15rem)] px-8 py-6 flex items-center justify-between bg-neutral-900 border-b border-neutral-800 fixed top-0 left-60 z-50">
      {/* Left side - Empty space for balance */}
      <div className="flex-1"></div>
      
      {/* Center - Title */}
      {title && (
        <div className="flex-1 flex justify-center">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
        </div>
      )}
      
      {/* Right side - Search and icons */}
      <div className="flex items-center gap-6 flex-1 justify-end">
        {showSearch && <SearchBar />}
        <Bell className="text-gray-200 cursor-pointer" size={26} />
        <div className="w-9 h-9 rounded-full bg-neutral-700 flex items-center justify-center cursor-pointer">
          <NavLink to="/post" ><User className="text-gray-200" size={22} /></NavLink>
        </div>
      </div>
    </nav>
  );
}