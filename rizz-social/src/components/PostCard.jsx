import { Heart, MessageCircle, Send, MoreHorizontal } from "lucide-react";
import TurnedInIcon from '@mui/icons-material/TurnedIn';
export default function PostCard({
  username = "Anne",
  time = "3 days ago",
  caption = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.sed do eiusmod tempo.",
  imageUrl = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  likes = 29,
  comments = 29,
  shares = 29,
}) {
  return (
    <div className="bg-neutral-800 p-8 rounded-2xl shadow-lg space-y-6 max-w-4xl w-full min-h-[380px]">
      {/* Header: Avatar, Username, Time, More Options */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-neutral-700 rounded-full flex items-center justify-center">
            <span className="text-white text-lg font-bold">
              {/* Placeholder avatar */}
              <svg width="24" height="24" fill="none">
                <circle cx="12" cy="8" r="4" fill="#fff" />
                <ellipse cx="12" cy="17" rx="7" ry="4" fill="#fff" />
              </svg>
            </span>
          </div>
          <div>
            <span className="font-semibold block text-white">{username}</span>
            <span className="text-gray-400 text-sm block">{time}</span>
          </div>
        </div>
        <MoreHorizontal size={24} className="text-gray-400 cursor-pointer" />
      </div>
      {/* Body: Image and Caption */}
      <div className="flex flex-row gap-6">
        <img
          src={imageUrl}
          alt="post"
          className="w-156 h-96 object-cover rounded-xl flex-shrink-0" /> {/*Increase width and height of the image*/}
        <p className="text-gray-300 text-base leading-relaxed self-start">
          {caption}
        </p>
      </div>
      {/* Footer: Likes, Comments, Shares, Repost Button */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex space-x-8 items-center text-gray-400">
          <span className="flex items-center space-x-2">
            <Heart size={22} className="cursor-pointer hover:text-pink-500" />
            <span className="text-base">{likes}</span>
          </span>
          <span className="flex items-center space-x-2">
            <MessageCircle size={22} className="cursor-pointer hover:text-blue-500" />
            <span className="text-base">{comments}</span>
          </span>
          <span className="flex items-center space-x-2">
            <Send size={22} className="cursor-pointer hover:text-green-500" />
            <span className="text-base">{shares}</span>
          </span>
          <span>
            <TurnedInIcon className="cursor-pointer hover:text-yellow-500 w-6 h-4" />
          </span>
        </div>
        <button className="bg-neutral-700 hover:bg-neutral-600 text-gray-200 px-8 py-2 rounded-full font-medium transition">
          Repost
        </button>
      </div>
    </div>
  );
}
