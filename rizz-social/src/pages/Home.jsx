import Sidebar from "../components/Sidebar";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white pt-24 ">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="ml-60 flex-1 p-8 space-y-8 overflow-y-auto flex flex-col items-center">
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
    </div>
  );
}
