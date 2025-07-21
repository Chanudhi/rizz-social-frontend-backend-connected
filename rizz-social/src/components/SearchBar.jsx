import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center bg-neutral-700 rounded-full px-4 py-2 w-80">
      <Search className="text-gray-400 mr-2" size={20} />
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent outline-none text-gray-200 w-full"
      />
    </div>
  );
}