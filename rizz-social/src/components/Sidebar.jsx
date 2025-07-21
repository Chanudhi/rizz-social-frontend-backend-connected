import { Flame, Compass, Users, Mail, CirclePlus, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="fixed top-0 left-0 h-screen w-60 bg-neutral-900 text-white flex flex-col justify-between p-6"> {/* Sidebar container */}
      <div className="flex flex-col gap-7"> {/* Sidebar Top content */}
        <NavLink to="/" ><h2 className="text-5xl font-regular font-irishgrover pl-4">Rizz</h2></NavLink> {/* Title with Irish Grover font */}
        <nav className="flex flex-col gap-4 pl-2 font-bold"> {/*Navigation links */}
          <NavLink to="/" className="flex gap-3 items-center"><Flame size={18}/> Trending</NavLink>
          <NavLink to="/#" className="flex gap-3 items-center"><Compass size={18}/>Explore</NavLink>
          <NavLink to="/friends" className="flex gap-3 items-center"><Users size={18}/> Friends</NavLink>
          <NavLink to="#" className="flex gap-3 items-center"><Mail size={18}/> Messages</NavLink>
          <NavLink to="/create" className="flex gap-3 items-center"><CirclePlus size={18}/> Create</NavLink>
        </nav>
      </div>
      <NavLink to="/login"  className="flex gap-3 items-center text-zinc-400 pl-2"><LogOut size={18}/> Logout</NavLink> {/* Logout link */}  
    </div>
  );
}
