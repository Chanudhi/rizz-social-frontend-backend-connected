import Sidebar from "../components/Sidebar";
import { UserMinus } from "lucide-react";
import Navbar from "../components/Navbar";

export default function Friends() {
  const friends = [
    { name: "Anne", username: "@anne" },
    { name: "Bob", username: "@bob" },
    { name: "Cara", username: "@cara" },
    { name: "Dylan", username: "@dylan" },
    { name: "Eva", username: "@eva" },
    { name: "Frank", username: "@frank" },
    { name: "Grace", username: "@grace" }
  ];

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar at top */}
        <Navbar showSearch={false} title="Friends" />

        {/* Friends List Container */}
        <div className="flex justify-center pt-36 px-4">
          <div className="w-full max-w-4xl ml-80 mr-12 space-y-6">
            <div className="space-y-6">
              {friends.map((friend) => (
                <div
                  key={friend.username}
                  className="bg-neutral-800 p-4 rounded-xl flex justify-between items-center hover:bg-neutral-700 transition-colors duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-[80px] h-[80px] rounded-full flex items-center justify-center" 
                      style={{ backgroundColor: '#3A86FF' }}
                    >
                      <span className="text-3xl font-bold text-white">
                        {friend.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-white">{friend.name}</span>
                      <span className="text-sm text-gray-400">{friend.username}</span>
                    </div>
                  </div>
                  <button 
                    className="text-red-500 hover:text-red-400 p-2 rounded-full hover:bg-red-500/10 transition-colors duration-200"
                    aria-label={`Remove ${friend.name} from friends`}
                  >
                    <UserMinus size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}